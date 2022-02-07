import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Env } from 'class/Env';

export const apolloClient = new ApolloClient({
    uri: Env.apiUrl,
    cache: new InMemoryCache()
});