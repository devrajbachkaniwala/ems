import axios, { AxiosResponse } from "axios";
import { TRegisterUser, TUser, TLoginUser } from "types/user";
import { TToken } from "types/token";
import { Env } from "class/Env";

class UserService {

    async registerUser(user: TRegisterUser): Promise<TUser> {
        try {
            const res: AxiosResponse<TUser> = await axios.post<TUser, AxiosResponse<TUser>, TRegisterUser>(`${Env.authUrl}/register`, user);

            return res.data;
        } catch(err: any) {
            throw new Error(`${err.response.data.errorCode}: ${err.response.data.message}`);
        }
    }
    
    async loginUser(user: TLoginUser): Promise<TToken> { 
        try {
            const res: AxiosResponse<TToken> = await axios.post<TToken, AxiosResponse<TToken>, TLoginUser>(`${Env.authUrl}/login`, user);
            return res.data;
        } catch(err: any) {
            throw new Error(`${err.response.data.errorCode}: ${err.response.data.message}`);
        }

    }
}

export default new UserService();