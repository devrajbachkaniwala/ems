import { config } from 'dotenv';

// config function is called in order to use environment variable 
config();

export class Env {
    // API server port from environment variable
    static get port(): number {
        return (process.env.API_PORT as any) as number || 3001;
    }

    // ACCESS_SALT from environment variable
    static get accessSalt(): string {
        return process.env.ACCESS_SALT || '';
    }
}