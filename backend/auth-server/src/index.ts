import 'reflect-metadata';
import express, { Express } from 'express';
import { registerRoute } from './routes/register';
import { Connection, createConnection } from 'typeorm';
import { loginRoute } from './routes/login';
import { tokenRoute } from './routes/token';
import { logoutRoute } from './routes/logout';
import { Env } from './class/Env';
import cors from 'cors';

// Connect to the database and start the server if database connection succeeds
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
                const connection: Connection = await createConnection()
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

        // Initializes express and PORT
        const app: Express = express();

        // Allow cross origin
        app.use(cors({ 
            origin: 'http://localhost:4000',
            credentials: true 
        }));
        
        // middleware function in order to access req.body as json
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        // Restricts routes register, login and token
        app.use('/register', registerRoute);
        app.use('/login', loginRoute);
        app.use('/token', tokenRoute);
        app.use('/logout', logoutRoute);
        
        // express app listening on port
        app.listen(Env.port, () => console.log(`AUTH Server started at port ${Env.port}`));

    } catch(err: any) {
        throw err;
    }
})();