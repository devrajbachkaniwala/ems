export type TLoginUser = {
  email: string;
  password: string;
};

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TAccessToken = Omit<TTokens, 'refreshToken'>;
