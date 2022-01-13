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
import { OrganizationResolver } from './resolvers/Organization';
import { EventPhotoResolver } from './resolvers/EventPhoto';
import { EventTimingResolver } from './resolvers/EventTiming';
import { EventPriceResolver } from './resolvers/EventPrice';
import { ReviewResolver } from './resolvers/Review';
import { BookingResolver } from './resolvers/Booking';
import { Env } from './class/Env';

(async () => {
    try {
        /* 
         * 10 Retries for the database connection 
         * each retry of 5 seconds
         * If succeeds then break the loop
         * Otherwise throw an error 
        */

        let retries: number = 10;
        while(retries) {
            try {
                const connection: Connection = await createConnection();
                console.log('Database connected successfully...');
                break;
            } catch(err: any) {
                console.log(err);
                retries -= 1;
                console.log(`${retries} retries left`);

                await new Promise((res) => setTimeout(res, 5000));
            }
        }

        if(retries === 0) {
            throw new Error('Failed to establish database connection');
        }
        
        // graphql schema
        const schema: GraphQLSchema = await buildSchema({ 
            resolvers: [ UserResolver, OrganizationResolver, EventResolver, EventPhotoResolver, EventTimingResolver, EventPriceResolver, ReviewResolver, BookingResolver ], 
            authChecker: customAuthChecker 
        });
        
        // Instantiate ApolloServer
        const apolloServer = new ApolloServer({ 
            schema, 
            context: ({ req }: any) => ({ req }), 
            formatError: (err) => err 
        });
        
        // Initialize express app
        const app: Express = express();
    
        // start apollo server at /graphql
        await apolloServer.start();

        // apply express app as a middleware in apolloserver's applyMiddleware method
        apolloServer.applyMiddleware({ app });
    
        // express app listening on port 3001 (port is provided in env)
        app.listen(Env.port, () => console.log(`API Server started at port ${Env.port}`));
    } catch(err: any) {
        console.log(err);
    }
})();