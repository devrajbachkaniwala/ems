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

config();

(async () => {
    try {
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
        
        const schema: GraphQLSchema = await buildSchema({ 
            resolvers: [ UserResolver, OrganizationResolver, EventResolver, EventPhotoResolver, EventTimingResolver, EventPriceResolver, ReviewResolver, BookingResolver ], 
            authChecker: customAuthChecker 
        });
        
        const apolloServer = new ApolloServer({ 
            schema, 
            context: ({ req }: any) => ({ req }), 
            formatError: (err) => err 
        });
        
        const app: Express = express();
    
        const PORT: number = (process.env.API_PORT as any) as number || 3001;
    
        await apolloServer.start();
        apolloServer.applyMiddleware({ app });
    
        app.listen(PORT, () => console.log(`API Server started at port ${PORT}`));
    } catch(err: any) {
        console.log(err);
    }
})();