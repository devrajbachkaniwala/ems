import axios, { AxiosResponse } from "axios";
import { Env } from "class/Env";
import { TAccessToken } from "types/token";

class TokenService {
    async getNewAccessToken(refreshToken: string): Promise<TAccessToken> {
        try {
            const res: AxiosResponse<TAccessToken> = await axios.post<TAccessToken, AxiosResponse<TAccessToken>>(`${Env.authUrl}/token`, null, {
                headers: {
                    authorization: `Bearer ${refreshToken}`
                },
                withCredentials: true
            });

            return res.data;
        } catch(err: any) {
            throw new Error(`${err.response.data.errorCode}: ${err.response.data.message}`);
        }
    }
}

export default new TokenService();