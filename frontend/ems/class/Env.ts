
export class Env {
    static get apiUrl(): string {
        return process.env.API_SERVER_URL || 'http://localhost:3001/graphql';
    }

    static get authUrl(): string {
        return process.env.AUTH_SERVER_URL || 'http://localhost:3000';
    }
}