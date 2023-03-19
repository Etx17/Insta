// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Comment, Like, Post, User } = initSchema(schema);

export {
  Comment,
  Like,
  Post,
  User
};