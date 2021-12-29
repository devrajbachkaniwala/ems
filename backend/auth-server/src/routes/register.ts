import { Request, Response, Router } from "express";
import { User } from "../entity/User";
import { IRegisterUser } from "../interface/IUser";
import bcrypt from 'bcryptjs';

/* 
*
*   Prefix Route /register
*
*/

// Initialize register route from express router
export const registerRoute: Router = Router();

// POST Request to Create user
registerRoute.post('/', async (req: Request, res: Response) => {
    try {
        // Get user data from frontend ( input fields )
        const newUser: IRegisterUser = req.body;
        const email: string = newUser.email;
    
        // Finding if email provided by user exists in the database
        const emailExist: User | undefined = await User.findOne({ where: { email } });
    
        // If user email exists then send the response Email already exists
        if(emailExist) {
            return res.json({ message: 'Email already exists' });
        }
    
        // If email not exists then hash (encrypt) the password provided by the user and assign encrypted password to the password property of newUser
        const hashPassword: string = await bcrypt.hash(newUser.password, 12); 
        newUser.password = hashPassword;
        
        // Save new User's data to the database
        const data: User = await User.create(newUser).save();
    
        // Send the response new user Registered
        res.status(201).json({ message: 'New user registered' });
    } catch(err: any) {
        throw new Error(err);
    }
});