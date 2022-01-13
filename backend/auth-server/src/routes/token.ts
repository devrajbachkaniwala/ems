import { Request, Response, Router } from "express";
import { verify, JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { generateToken } from "../shared/generateToken";
import { RefreshToken } from "../entity/RefreshToken";
import { Env } from "../class/Env";

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

    // If token is not available in auhtorization header of the request then send error response token not provided
    if(!token) {
        return res.status(401).json({ errorCode: 'Token error', message: 'Token not provided' });
    }

    const refreshTokenExist: RefreshToken | undefined = await RefreshToken.findOne({ where: { refreshToken: token } });

    if(!refreshTokenExist) {
        return res.status(404).json({ errorCode: 'Token error', message: 'Token not found' });
    }

    // Verifying jwt refresh token with refresh salt
    verify(refreshTokenExist.refreshToken, Env.refreshSalt, (err: VerifyErrors | null, payload: JwtPayload | undefined) => {
        // If token is invalid then send error response invalid token
        if(err) {
            return res.status(401).json({ errorCode: 'Token error', message: 'Invalid token' });
        }

        // If token is valid then generate new jwt access token
        const token: string = generateToken({ userId: payload?.userId });

        // Send response of newly generated jwt access token
        res.status(200).json({ accessToken: token, tokenType: 'Bearer', expiresIn: '30m' });
    });

})