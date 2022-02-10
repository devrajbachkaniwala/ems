class Token {

    private accessToken: string = '';
    private refreshToken: string = '';

    getAccessToken(): string {
        return this.accessToken;
    }

    setAccessToken(token: string): void {
        this.accessToken = token;
    }

    getRefreshTokenFromLocalStorage(): string {        
        return localStorage.getItem('auth') || '';
    }

    setRefreshTokenToLocalStorage(token: string): void {
        localStorage.setItem('auth', token);
    }
}

export default new Token();
