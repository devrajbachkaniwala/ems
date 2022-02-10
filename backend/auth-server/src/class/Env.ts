import { config } from 'dotenv';

// config function is called in order to use environment variable 
config();

export class Env {
    // Auth server port from environment variable
    static get port(): number {
        return (process.env.AUTH_PORT as any) as number || 3000;
    }

    // static refreshSalt getter to get refresh salt from environment variable
    static get refreshSalt(): string {
        return process.env.REFRESH_SALT || '';
    }
    
    // static accessSalt getter to get access salt from environment variable
    static get accessSalt(): string {
        return process.env.ACCESS_SALT || '';
    }

    // Node environment
    static get nodeEnv(): string {
        return process.env.NODE_ENV || 'development';
    }
}