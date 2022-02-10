import { IPayload } from "../interface/IPayload";
import { sign } from 'jsonwebtoken';
import { Env } from "../class/Env";

// Generates new jwt access token and returns it
export const generateAccessToken = (payload: IPayload): string => {
    // Get jwt access token by signing it with payload and access salt
    const accessToken: string = sign(payload, Env.accessSalt, { expiresIn: '30m' });
    return accessToken;
}