import { Request, Response, Router } from "express";
import { User } from "../entity/User";
import { IRegisterUser } from "../interface/IUser";
import { hash } from 'bcryptjs';

/* 
*
*   Prefix Route /register
*
*/

// Initialize register route from express router
export const registerRoute: Router = Router();

// POST Request to Create user
registerRoute.post('/', async (req: Request<null, null, IRegisterUser>, res: Response) => {
    try {
        // Get user data from frontend ( input fields )
        const newUser: IRegisterUser = req.body;

        if(newUser.username.length < 5) {
            return res.json({ title: 'Invalid value', message: 'Username should be at least 5 characters' });
        }
    
        // Finding if email provided by user exists in the database
        const emailExist: User | undefined = await User.findOne({ where: { email: newUser.email } });
    
        // If user email exists then send the response Email already exists
        if(emailExist) {
            return res.json({ ok: false, message: 'Email already exists' });
        }
    
        // If email not exists then hash (encrypt) the password provided by the user and assign encrypted password to the password property of newUser
        const hashPassword: string = await hash(newUser.password, 12); 
        newUser.password = hashPassword;
        
        if(newUser.email.endsWith('@admin.com')) {
            // Save new User's data in the database with admin role
            const data: User = await User.create({ 
                role: 'admin',  
                ...newUser
            }).save();
        } else { 
            // Save new User's data in the database with user role
            const data: User = await User.create({ 
                role: 'user',  
                ...newUser
            }).save();
        }
    
        // Send the response new user Registered
        res.status(201).json({ ok: true, message: 'New user registered' });
    } catch(err: any) {
        throw new Error(err);
    }
});