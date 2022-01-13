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
 
     // If token is not available in auhtorization header request then send error response token not provided
     if(!token) {
         return res.status(401).json({ errorCode: 'Token error', message: 'Token not provided' });
     }

     // Deleting refresh token from database
     const refreshToken: DeleteResult | undefined = await RefreshToken.delete({ refreshToken: token });
     if(!refreshToken.affected) {
         return res.status(404).json({ errorCode: 'Token error', message: 'Token not found' });
     }
     return res.sendStatus(204);
});