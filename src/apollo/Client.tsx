import { ApolloClient, InMemoryCache, ApolloLink, ApolloProvider, createHttpLink, TypePolicies } from '@apollo/client';
import {createAuthLink} from 'aws-appsync-auth-link'
import { AuthOptions, AUTH_TYPE } from 'aws-appsync-auth-link/lib/auth-link';
import {createSubscriptionHandshakeLink} from 'aws-appsync-subscription-link'
import config from '../aws-exports'
interface IClient {
    children: React.ReactNode;
}

const url = config.aws_appsync_graphqlEndpoint;
const region = config.aws_appsync_region;

const auth: AuthOptions = {
    type: config.aws_appsync_authenticationType as AUTH_TYPE.API_KEY,
    apiKey: config.aws_appsync_apiKey,
}

const httpLink = createHttpLink({uri: url});

const link = ApolloLink.from([
    createAuthLink({url, region, auth}),
    createSubscriptionHandshakeLink({url, region, auth}, httpLink)
]);   
            

const typePolicies: TypePolicies = { // Repreents how we shold merge objects in our cache, needed for pagination
    Query: {
        fields: {
            commentsByPost: {
                keyArgs: ['postID', 'createdAt', 'sortDirection', 'filter'], // need to specify arguments of query that shold trigger Apollo to save the results in different buckets.
                merge: (existing, incoming) => {
                    return {
                        ...existing,
                        ...incoming,
                        items: [...(existing?.items || []), ...incoming.items],
                    };
                },
            },
        },
    },
}

const client = new ApolloClient({
    link,
    cache: new InMemoryCache({typePolicies}),
  });

const Client = ({children}: IClient) => {
    return (
      <ApolloProvider client={client}>{children}</ApolloProvider>
    )
    };

export default Client;