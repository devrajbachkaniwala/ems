import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import { config } from 'dotenv';
import { registerRoute } from './routes/register';
import { Connection, createConnection } from 'typeorm';
import { loginRoute } from './routes/login';
import { tokenRoute } from './routes/token';

// config function is called in order to use environment variable
config();

// Connect to the database and start the server if database connection succeeds
createConnection()
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
        
        // Root route 
        app.get('/', (req: Request, res: Response) => {
            res.json({ message: 'Hello World auth server' });
        } );
        
        // express app listening on port
        app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
    })
    .catch((err: any) => {
        throw new Error(err);
    });
