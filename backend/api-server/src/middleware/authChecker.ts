import { JwtPayload } from "jsonwebtoken";
import { AuthChecker, ResolverData } from "type-graphql";
import jwt from 'jsonwebtoken';
import { User } from "../entity/User";
import { IContext } from "../interface/IContext";
import { OrganizationTeamMember } from "../entity/OrganizationTeamMember";

export const customAuthChecker: AuthChecker<IContext> = async ({ context }: ResolverData<IContext>, roles: string[]): Promise<boolean> => {
    const authHeader: string | undefined = context.req.headers.authorization;
    const token: string | undefined = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return false;
    }

    const ACCESS_TOKEN_SECRET_KEY: string = process.env.ACCESS_TOKEN_SECRET_KEY || '';

    const payload: string | JwtPayload = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);

    if(typeof payload === 'string') {
        return false;
    }

    context.req.userId = payload?.userId;

    try {
        for(let role of roles) {
            if(role === 'ADMIN') {
                const user: User = await User.findOne(context.req.userId);
                return (user.role === 'admin') ? true : false;
            }
            
            if(role === 'ORGANIZATION') {
                const user: User = await User.findOne(context.req.userId);
                return (user.role === 'organization') ? true : false;
            }
            
            if(role === 'USER') {
                return true;
            }
        } 
    } catch(err: any) {
        console.log(err);
    }
    
    return false;
}