import { parse, serialize } from "cookie";
import { Request, Response, Router } from "express";
import { DeleteResult } from "typeorm";
import { Env } from "../class/Env";
import { RefreshToken } from "../entity/RefreshToken";

/* 
*
*   Prefix Route /logout
*
*/

// Initialize logout route from express router
export const logoutRoute: Router = Router();

logoutRoute.post('/', async (req: Request, res: Response) => {
/* 
    // getting cookies
    const cookies = parse(req.headers.cookie || '');

    // if authJwt cookie is not available in the cookies then user is unauthorized to access this route
    if(!cookies.authJwt) {
        return res.status(401).json({ errorCode: 'Token error', message: 'Token not provided' });
    }

     */

     // Get jwt refresh token from authorization header
    const authHeader: string | undefined = req.headers.authorization;
    const token: string | undefined = authHeader && authHeader.split(' ')[1];

    // If token is not available in auhtorization header request then send error response token not provided
    if(!token) {
        return res.status(401).json({ errorCode: 'Token error', message: 'Token not provided' });
    }

    // Deleting refresh token from database
    const refreshToken: DeleteResult | undefined = await RefreshToken.delete({ refreshToken: token });
    if(!refreshToken.affected) {
        return res.status(404).json({ errorCode: 'Token error', message: 'Token not found' });
    }
/* 
    // serializing httpOnly cookie and setting cookie value to past milisecond in order to delete it from the browser
     const serialized = serialize('authJwt', '', {
        httpOnly: true,
        secure: Env.nodeEnv !== 'development',
        sameSite: 'strict',
        maxAge: -1,
        path: '/'
    });

    // setting headers to set cookie
    res.setHeader('Set-Cookie', serialized);
 */
    return res.sendStatus(204);
});