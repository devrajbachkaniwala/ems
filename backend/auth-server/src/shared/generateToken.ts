import { IPayload } from "../interface/IPayload";
import { sign } from 'jsonwebtoken';
import { config } from "dotenv";
import { Env } from "../class/Env";

// config function is called in order to use environment variable
config();

// Generates new jwt access token and returns it
export const generateToken = (payload: IPayload): string => {
    // Get jwt access token by signing it with payload and access salt
    const token: string = sign(payload, Env.accessSalt, { expiresIn: '30m' });
    return token;
}