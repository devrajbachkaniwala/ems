import { IPayload } from "../interface/IPayload";
import jwt from 'jsonwebtoken';
import { config } from "dotenv";

// config function is called in order to use environment variable
config();

// Generates new jwt access token and returns it
export const generateToken = (payload: IPayload): string => {
    // Get access token secret key from environment variable
    const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY || '';

    // Get jwt access token by signing it with payload and access token secret key
    const token: string = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, { expiresIn: '15m' });
    return token;
}