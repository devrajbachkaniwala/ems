import tokenService from '@/services/tokenService';
import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  NextLink,
  NormalizedCacheObject,
  Operation
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Env } from 'class/Env';
import tokenClass from 'class/Token';
import { JwtPayload, verify } from 'jsonwebtoken';

const http: HttpLink = new HttpLink({
  uri: Env.apiUrl
});

/* This code is adding an authorization header to the request. */
const authMiddleware: ApolloLink = new ApolloLink(
  (operation: Operation, forward: NextLink) => {
    console.log('authMiddleware operation before');
    const accessToken: string | null = sessionStorage.getItem('aToken');
    const refreshToken: string | null = localStorage.getItem('rToken');
    if (accessToken) {
      const isTokenValid: string | JwtPayload = verify(
        accessToken,
        Env.accessSalt
      );
      const curDate = Math.floor(Date.now() / 1000);
      if (typeof isTokenValid !== 'string') {
        if (isTokenValid.exp && isTokenValid.exp > curDate) {
          operation.setContext((req: any, prevCtx: any) => ({
            ...prevCtx,
            headers: {
              authorization: `Bearer ${accessToken}`
            }
          }));
        }
      }
    } else if (refreshToken) {
      tokenService.getNewAccessToken(refreshToken).then((token) => {
        operation.setContext((req: any, prevCtx: any) => ({
          ...prevCtx,
          headers: {
            authorization: `Bearer ${token}`
          }
        }));
      });
    }

    /* A middleware that is executed after the operation is executed. */
    return forward(operation).map((data) => {
      console.log('after operation execution');
      return data;
    });
  }
);

const setAuth = new ApolloLink((operation, forward) => {
  //console.log(operation.query.definitions[0].name.value);
  if (typeof window !== 'undefined') {
    operation.setContext((req: any, prevCtx: any) => {
      const accessToken = sessionStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      console.log(`accessToken: ${accessToken}`);
      console.log(`refreshToken: ${refreshToken}`);
      const curDate = Math.floor(Date.now() / 1000);

      if (accessToken) {
        const isValid = verify(accessToken, Env.accessSalt);
        if (typeof isValid !== 'string' && isValid.exp) {
          if (isValid.exp > curDate) {
            console.log(isValid);
            return {
              ...prevCtx,
              headers: {
                authorization: `Bearer ${accessToken}`
              }
            };
          }
        }
      }
      if (refreshToken) {
        return tokenService.getNewAccessToken(refreshToken).then((res) => {
          return {
            ...prevCtx,
            headers: {
              authorization: `Bearer ${res.accessToken}`
            }
          };
        });
      }
    });
  }

  return forward(operation);
});
const ctx = setContext(async (_, prevCtx: any) => {
  const accessToken = sessionStorage.getItem('aToken');
  if (!accessToken) return;
  const refreshToken = localStorage.getItem('rToken');
  if (!refreshToken) return;
  console.log(`aToken: ${accessToken}`);
  console.log(`rToken: ${refreshToken}`);
  const curDate = Math.floor(Date.now() / 1000);

  if (accessToken) {
    const isValid = verify(accessToken, Env.accessSalt);
    if (typeof isValid !== 'string' && isValid.exp) {
      if (isValid.exp > curDate) {
        return {
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        };
      }
    }
  } else if (refreshToken) {
    const token = await tokenService.getNewAccessToken(refreshToken);
    return {
      headers: {
        authorization: `Bearer ${token.accessToken}`
      }
    };
  }
});

/* It creates a new ApolloClient instance. */
export const apolloClient: ApolloClient<NormalizedCacheObject> =
  new ApolloClient({
    cache: new InMemoryCache(),
    link: from([setAuth, http])
  });
