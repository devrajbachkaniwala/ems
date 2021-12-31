import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { Connection, createConnection } from 'typeorm';
import express, { Express } from 'express';
import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { config } from 'dotenv';
import { EventResolver } from './resolvers/Event';

config();

(async (): Promise<void> => {
    const connection: Connection = await createConnection();
    const schema: GraphQLSchema = await buildSchema({ resolvers: [ EventResolver ] });
    
    const apolloServer: ApolloServer = new ApolloServer({ schema });
    
    const app: Express = express();

    const PORT: number = (process.env.PORT as any) as number || 3001;

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(PORT, () => console.log(`API Server started at port ${PORT}`));
})();