import { Request, Response, Router } from "express";
import { verify, JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { config } from "dotenv";
import { generateToken } from "../shared/generateToken";
import { RefreshToken } from "../entity/RefreshToken";
import { Env } from "../class/Env";

// config function is called in order to use environment variable
config();

/* 
*
*   Prefix Route /token
*
*/

// Initialize token route from express router
export const tokenRoute: Router = Router();

// POST Request to create new access token from refresh token
tokenRoute.post('/', async (req: Request, res: Response) => {
    // Get jwt refresh token from authorization header
    const authHeader: string | undefined = req.headers.authorization;
    const token: string | undefined = authHeader && authHeader.split(' ')[1];

    // If token is not available in auhtorization then send response token not provided
    if(!token) {
        return res.json({ ok: false, message: 'Token not provided' });
    }

    const refreshTokenExist: RefreshToken | undefined = await RefreshToken.findOne({ where: { refreshToken: token } });

    if(!refreshTokenExist) {
        return res.json({ ok: false, message: 'Login again' });
    }

    // Verifying jwt refresh token with refresh salt
    verify(token, Env.refreshSalt, (err: VerifyErrors | null, payload: JwtPayload | undefined) => {
        // If token is invalid then send response invalid token
        if(err) {
            return res.json({ ok: false, message: 'Invalid token' });
        }

        // If token is valid then generate new jwt access token
        const token: string = generateToken({ userId: payload?.userId });

        // Send response of newly generated jwt access token
        res.json({ ok: true, message: 'New token', token });
    })

})