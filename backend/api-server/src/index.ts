import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { Connection, createConnection } from 'typeorm';
import express, { Express } from 'express';
import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { config } from 'dotenv';
import { EventResolver } from './resolvers/Event';
import { UserResolver } from './resolvers/User';
import { customAuthChecker } from './middleware/authChecker';
import { OrganizationTeamMemberResolver } from './resolvers/OrganizationTeamMember';
import { OrganizationResolver } from './resolvers/Organization';

config();

(async (): Promise<void> => {
    const connection: Connection = await createConnection();
    const schema: GraphQLSchema = await buildSchema({ resolvers: [ UserResolver, OrganizationResolver, OrganizationTeamMemberResolver ], authChecker: customAuthChecker });
    
    const apolloServer = new ApolloServer({ schema, context: ({ req }: any) => ({ req }) });
    
    const app: Express = express();

    const PORT: number = (process.env.PORT as any) as number || 3001;

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(PORT, () => console.log(`API Server started at port ${PORT}`));
})();