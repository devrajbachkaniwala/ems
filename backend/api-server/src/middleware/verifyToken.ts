import { MiddlewareFn, NextFn, ResolverData } from "type-graphql";
import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyToken: MiddlewareFn<{ req: any }> = async ({ context }: ResolverData<{ req: any }>, next: NextFn): Promise<any> => {
    
    const authHeader: string | undefined = context.req.headers.authorization;
    const token: string | undefined = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return;
    }

    const ACCESS_TOKEN_SECRET_KEY: string = process.env.ACCESS_TOKEN_SECRET_KEY || '';

    const payload: string | JwtPayload = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);

    if(typeof payload === 'string') {
        return;
    }

    context.req.userId = payload?.userId;
    return next();
}