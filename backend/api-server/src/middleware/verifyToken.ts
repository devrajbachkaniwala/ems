import { MiddlewareFn, NextFn, ResolverData } from "type-graphql";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IContext } from "../interface/IContext";

export const verifyToken: MiddlewareFn<IContext> = async ({ context }: ResolverData<IContext>, next: NextFn): Promise<any> => {
    
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