import { Request, Response, Router } from "express";
import { User } from "../entity/User";
import { ILoginUser } from "../interface/IUser";
import bycrypt from 'bcryptjs';
import { generateToken } from "../shared/generateToken";
import jwt from 'jsonwebtoken';
import { IPayload } from "../interface/IPayload";
import { config } from "dotenv";
import { RefreshToken } from "../entity/RefreshToken";

// config function is called in order to use environment variable
config();

/* 
*
*   Prefix Route /login
*
*/

// Initializa login route from express router
export const loginRoute: Router = Router();

// POST Request to Login user
loginRoute.post('/', async (req: Request, res: Response) => {
    try {
        // Get user's email and password from frontend ( input fields )
        const loginUser: ILoginUser = req.body;
    
        // Checking if email exists in the database
        const userData: User | undefined = await User.findOne({ where: { email: loginUser.email } });
    
        // If email not exist then send the response no user found with that email
        if(!userData) {
            return res.json({ ok: false, message: 'No user found with that email' });
        }
    
        // If email exists then comparing the password provided by the user is same as the password stored in the database
        const hashPass: string = userData?.password || '';
        const hasCorrectCredential: boolean = await bycrypt.compare(loginUser.password, hashPass);
    
        // If password is incorrect then send the response Invalid password
        if(!hasCorrectCredential) {
            return res.json({ ok: false, message: 'Invalid Password' });
        }

        // If password is correct then get the userId from database of that email and store it in userId property of payload object
        const payload: IPayload = {
            userId: userData.id
        };

        // Get jwt access token from generateToken function by providing payload as an argument
        const token: string = generateToken(payload);

        // Get refresh token secret key from environment variable
        const REFRESH_TOKEN_SECRET_KEY: string = process.env.REFRESH_TOKEN_SECRET_KEY || '';

        // Get jwt refresh token by signing it with payload and refresh token secret key
        const refreshToken: string = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY);
    
        await RefreshToken.create({ refreshToken }).save();

        // Send json response containing jwt access token and jwt refresh token
        res.json({ ok: true, message: 'Provide tokens', accessToken: token, refreshToken });
    } catch(err: any) {
        throw new Error(err);
    }
});