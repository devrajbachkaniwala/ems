import { Request, Response, Router } from "express";
import { User } from "../entity/User";
import { ILoginUser } from "../interface/IUser";
import { compare } from 'bcryptjs';
import { generateToken } from "../shared/generateToken";
import { sign } from 'jsonwebtoken';
import { IPayload } from "../interface/IPayload";
import { RefreshToken } from "../entity/RefreshToken";
import { Env } from "../class/Env";

/* 
*
*   Prefix Route /login
*
*/

// Initializa login route from express router
export const loginRoute: Router = Router();

// POST Request to Login user
loginRoute.post('/', async (req: Request<null, null, ILoginUser>, res: Response) => {
    try {
        // Get user's email and password from frontend ( input fields )
        const loginUser: ILoginUser = req.body;
    
        // Checking if email exists in the database
        const userData: User | undefined = await User.findOne({ where: { email: loginUser.email } });
    
        // If email not exist then send the error response no user found with that email
        if(!userData) {
            return res.status(401).json({ errorCode: 'User error', message: 'No user found with that email' });
        }
    
        // If email exists then comparing the password provided by the user is same as the password stored in the database
        const hashPass: string = userData?.password || '';
        const hasCorrectCredential: boolean = await compare(loginUser.password, hashPass);
    
        // If password is incorrect then send the error response Invalid password
        if(!hasCorrectCredential) {
            return res.status(401).json({ errorCode: 'Password error', message: 'Invalid Password' });
        }

        // If password is correct then get the userId from database of that email and store it in userId property of payload object
        const payload: IPayload = {
            userId: userData.id
        };

        // Get jwt access token from generateToken function by providing payload as an argument
        const token: string = generateToken(payload);

        // Get jwt refresh token by signing it with payload and refresh salt
        const refreshToken: string = sign(payload, Env.refreshSalt);
    
        await RefreshToken.create({ refreshToken }).save();

        // Send json response containing jwt access token and jwt refresh token
        res.status(200).json({ accessToken: token, tokenType: 'Bearer', expiresIn: '30m', refreshToken });
    } catch(err: any) {
        throw new Error(err);
    }
});