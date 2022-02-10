import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache, NextLink, NormalizedCacheObject, Operation } from '@apollo/client';
import { Env } from 'class/Env';
import tokenClass from 'class/Token';

const http: HttpLink = new HttpLink({
    uri: Env.apiUrl
});

const authMiddleware: ApolloLink = new ApolloLink((operation : Operation, forward: NextLink) => {
    console.log('authLink operation');
    const accessToken: string = tokenClass.getAccessToken();

    if(accessToken) {
        operation.setContext((req: any, prevCtx: any) => ({ 
            ...prevCtx, 
            headers: {
                authorization: `Bearer ${accessToken}`
            } 
        }));
    }
    console.log(operation.getContext());

    return forward(operation).map(data => {
      console.log('after operation execution');
      return data;
    });
});

export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
        authMiddleware,
        http
    ])
});
