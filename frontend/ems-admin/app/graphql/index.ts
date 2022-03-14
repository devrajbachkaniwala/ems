import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { Env } from '../../class/Env';
import { setContext } from '@apollo/client/link/context';
import { decode, JwtPayload } from 'jsonwebtoken';
import authService from '@/services/authService';

const httpLink = new HttpLink({ uri: Env.apiUrl });

const authTokenMiddleware = setContext(async (req, { headers }) => {
  if (!window) {
    return;
  }

  const accessToken = sessionStorage.getItem('accessToken') ?? '';

  if (accessToken) {
    const tokenMetaData: string | JwtPayload | null = decode(accessToken);
    if (tokenMetaData && typeof tokenMetaData !== 'string') {
      const currTime = Date.now() / 1000;
      if (tokenMetaData.exp && tokenMetaData.exp > currTime) {
        console.log('accessToken time valid');
        return {
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        };
      }
    }
  }
  const refreshToken = localStorage.getItem('refreshToken') ?? '';
  if (refreshToken) {
    const res = await authService.getNewAccessToken(refreshToken);
    sessionStorage.setItem('accessToken', res.accessToken);
    console.log('fetched new accessToken');
    return {
      headers: {
        authorization: `Bearer ${res.accessToken}`
      }
    };
  }
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authTokenMiddleware, httpLink])
});
