import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import { config } from 'dotenv';
import { registerRoute } from './routes/register';
import { Connection, createConnection } from 'typeorm';
import { loginRoute } from './routes/login';
import { tokenRoute } from './routes/token';
import { logoutRoute } from './routes/logout';

// config function is called in order to use environment variable
config();

// Connect to the database and start the server if database connection succeeds
(async () => {
    try {
        
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

        // Initializes express and PORT
        const app: Express = express();
        const PORT: number = (process.env.AUTH_PORT as any) as number || 3000; 
        
        // middleware function in order to access req.body as json
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        // Restricts routes register, login and token
        app.use('/register', registerRoute);
        app.use('/login', loginRoute);
        app.use('/token', tokenRoute);
        app.use('/logout', logoutRoute);
        
        // express app listening on port
        app.listen(PORT, () => console.log(`AUTH Server started at port ${PORT}`));

    } catch(err: any) {
        throw err;
    }
})();

/* createConnection()
    .then((connection: Connection) => {
        console.log('Database connected successfully...');

        // Initializes express and PORT
        const app: Express = express();
        const PORT: number = (process.env.PORT as any) as number || 3000; 
        
        // middleware function in order to access req.body as json
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        // Restricts routes register, login and token
        app.use('/register', registerRoute);
        app.use('/login', loginRoute);
        app.use('/token', tokenRoute);
        app.use('/logout', logoutRoute);
        
        // express app listening on port
        app.listen(PORT, () => console.log(`AUTH Server started at port ${PORT}`));
    })
    .catch((err: any) => {
        console.log(err);
        //throw new Error(err);
    }); */
