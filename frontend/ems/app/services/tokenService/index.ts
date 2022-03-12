import axios, { AxiosResponse } from 'axios';
import { Env } from 'class/Env';
import { TAccessToken, TTokens } from 'types/token';

class TokenService {
  async getNewAccessToken(refreshToken: string): Promise<TAccessToken> {
    try {
      const res: AxiosResponse<TAccessToken> = await axios.post<
        TAccessToken,
        AxiosResponse<TAccessToken>
      >(`${Env.authUrl}/token`, null, {
        headers: {
          authorization: `Bearer ${refreshToken}`
        }
      });
      sessionStorage.setItem('accessToken', res.data.accessToken);

      return res.data;
    } catch (err: any) {
      if (err.response.data.errorCode && err.response.data.message) {
        throw new Error(
          `${err.response.data.errorCode}: ${err.response.data.message}`
        );
      }
      throw err;
    }
  }
}

export default new TokenService();
