import { Request, Response, Router } from "express";
import { DeleteResult } from "typeorm";
import { RefreshToken } from "../entity/RefreshToken";

/* 
*
*   Prefix Route /logout
*
*/

// Initialize logout route from express router
export const logoutRoute: Router = Router();

logoutRoute.post('/', async (req: Request, res: Response) => {
     // Get jwt refresh token from authorization header
     const authHeader: string | undefined = req.headers.authorization;
     const token: string | undefined = authHeader && authHeader.split(' ')[1];
 
     // If token is not available in auhtorization then send response token not provided
     if(!token) {
         return res.json({ ok: false, message: 'Token not provided' });
     }

     // Deleting refresh token from database
     const refreshToken: DeleteResult | undefined = await RefreshToken.delete({ refreshToken: token });
     if(!refreshToken.affected) {
         return res.json({ ok: false, message: 'Token not found' });
     }
     return res.json({ ok: true, message: 'Logged out successfully' });
});