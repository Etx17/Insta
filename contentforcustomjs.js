/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient();

const AppsyncID = process.env.API_INSTA_GRAPHQLAPIIDOUTPUT;
const env = process.env.ENV;

const TableName = `User-${AppsyncID}-${env}`; //tablename-appsyncid-env = User-mdnjiuhrkbfdxas73awflfstna-staging
const userExists = async id => {
  const params = {
    TableName,
    Key: id,
  }
  try {
    const response = await docClient.get(params).promise()
    return !!response?.Item; 
  } catch(e){
    console.log(e, 'error in userExists')
    return false;
  }
};

const saveUser = async user => {
  const date= new Date();
  const dateStr = date.toISOString();
  const timestamp = date.getTime();
  const Item = {
    ...user,
    createdAt: dateStr,
    updatedAt: dateStr,
    _lastChangedAt: timestamp,
    _version: 1, // i had 5 in dynamodb, change to it if not working
    __typename: 'User',
  };
  const params = { 
    TableName,
    Item,
  };
  
  try {
    await docClient.put(params).promise();
  } catch(e) {
    console.log(e)
  }
};

exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger

  if(!event?.request.userAttributes){
    console.log('no user data available');
    return
  }
  console.log(event.request.userAttributes, 'this is Event.request.userAttributes');
  const {sub, name, email} = event.request.userAttributes;

  const newUser = { 
    id: sub, 
    name,
    email,
    nofPosts: 0,
    nofFollowers: 0,
    nofFollowings: 0,
  }

  // check if user already exists 
  // const user = await context.amplify.invokePluginMethod(context, 'awscloudformation', undefined, 'getUser', [sub]);
  if(!(await userExists(newUser.id))){
   await saveUser(newUser);
   console.log('user has been saved to DB', newUser.id);
  } else {
    console.log('user already exists', newUser.id);
  }
  
  // if not, save user to the database 
  return event;

};

