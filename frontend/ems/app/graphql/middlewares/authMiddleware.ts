import { ApolloLink, NextLink, Operation } from '@apollo/client';
import { TTokens } from 'types/token';

export const authMiddleware = (token: TTokens) =>
  new ApolloLink((operation: Operation, forward: NextLink) => {
    const headers: { authorization: string } = {
      authorization: `Bearer ${token.accessToken}`,
    };
    console.log('authLink operation');
    operation.setContext((req: any, prevCtx: any) => ({ ...prevCtx, headers }));
    return forward(operation).map((data) => {
      console.log('after operation execution');
      return data;
    });
  });
