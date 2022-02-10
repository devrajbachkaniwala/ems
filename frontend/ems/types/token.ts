export type TTokens = {
    accessToken: string,
    tokenType: 'Bearer',
    expiresIn: string,
    refreshToken: string
}

export type TAccessToken = Omit<TTokens, 'refreshToken'>;

