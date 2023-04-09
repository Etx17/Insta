import { ApolloClient, InMemoryCache, ApolloLink, ApolloProvider, createHttpLink, TypePolicies } from '@apollo/client';
import {createAuthLink} from 'aws-appsync-auth-link'
import { AuthOptions, AUTH_TYPE } from 'aws-appsync-auth-link/lib/auth-link';
import {createSubscriptionHandshakeLink} from 'aws-appsync-subscription-link'
import config from '../aws-exports'
import { useAuthContext } from '../contexts/AuthContext';
import { locale } from 'dayjs';
import {useMemo} from 'react'

interface IClient {
    children: React.ReactNode;
}

const url = config.aws_appsync_graphqlEndpoint;
const region = config.aws_appsync_region;

// const auth: AuthOptions = {
    // type: config.aws_appsync_authenticationType as AUTH_TYPE.AMAZON_COGNITO_USER_POOLS, // et non plus comme avant AUTH_TYPE.API_KEY,
    // apiKey: config.aws_appsync_apiKey, this is not needed anymore since authorisation module  
    // jwtToken: 
// }

const httpLink = createHttpLink({uri: url});

// const link = ApolloLink.from([
//     createAuthLink({url, region, auth}),
//     createSubscriptionHandshakeLink({url, region, auth}, httpLink)
// ]);   
            
const mergeLists = (existing = {items: []}, incoming = {items: []}) => {
    return {
        ...existing,
        ...incoming,
        items: [...(existing?.items || []), ...incoming.items],
    };
}
const typePolicies: TypePolicies = { // Repreents how we shold merge objects in our cache, needed for pagination
    Query: {
        fields: {
            commentsByPost: {
                keyArgs: ['postID', 'createdAt', 'sortDirection', 'filter'], // this line is important, it tells apollo how to merge the results of the query
                merge: mergeLists,
            },
            postsByDate: {
                keyArgs: ['type', 'createdAt', 'sortDirection', 'filter'], 
                merge: mergeLists,
            },
        },
    },
}

// const client = new ApolloClient({
//     link,
//     cache: new InMemoryCache({typePolicies}),
//   });

const Client = ({children}: IClient) => {
    const {user} = useAuthContext();

    const client = useMemo(() => {
        const jwtToken = user?.getSignInUserSession()?.getAccessToken().getJwtToken() || '';

        
        const auth: AuthOptions = {
            type: config.aws_appsync_authenticationType as AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
            jwtToken: jwtToken,
        }

        const link = ApolloLink.from([
            createAuthLink({url, region, auth}),
            createSubscriptionHandshakeLink({url, region, auth}, httpLink)
        ]);   


        return new ApolloClient({
            link,
            cache: new InMemoryCache({typePolicies}),
        });

    }, [user])
    // const jwtToken = user?.getSignInUserSession()?.getAccessToken().getJwtToken() || '';

    // const auth: AuthOptions = {
    //             type: config.aws_appsync_authenticationType as AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    //             jwtToken,
    //         }

    // const link = ApolloLink.from([
    //     createAuthLink({url, region, auth}),
    //     createSubscriptionHandshakeLink({url, region, auth}, httpLink)
    // ]);   

    // const client = new ApolloClient({
    //             link,
    //             cache: new InMemoryCache({typePolicies}),
    //         });


    return <ApolloProvider client={client}>{children}</ApolloProvider>
    
    };

export default Client;