import { Request, Response, Router } from "express";
import { User } from "../entity/User";
import { IRegisterUser, IUser } from "../interface/IUser";
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
        const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passRegExp = new RegExp(`^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.~!@#$%^&()-]).{8,20}$`, 'g');

        // Validating email
        if(!emailRegExp.test(newUser.email)) {
            return res.status(400).json({ error: 'Invalid value', message: 'Invalid email' });
        }

        // Validating password
        if(!passRegExp.test(newUser.password)) {
            return res.status(400).json({ error: 'Invalid value', message: 'Invalid password' });
        }
    
        // Finding if email provided by user exists in the database
        const emailExist: User | undefined = await User.findOne({ where: { email: newUser.email } });
    
        // If user email exists then send the response Email already exists
        if(emailExist) {
            return res.status(400).json({ error: 'Invalid value', message: 'Email already exists' });
        }
    
        // Validating username length
        if(newUser.username.length < 5) {
            return res.status(400).json({ error: 'Invalid value', message: 'Username should be at least 5 characters' });
        }

        // If email not exists then hash (encrypt) the password provided by the user and assign encrypted password to the password property of newUser
        const hashPassword: string = await hash(newUser.password, 12); 
        newUser.password = hashPassword;
        
        const userData: User = User.create(newUser)

        if(userData.email.endsWith('@admin.com')) {
            // Providing admin role
            userData.role = 'admin';
        } else { 
            // Providing user role
            userData.role = 'user';
        }
        
        // Save new User's data in the database
        await userData.save();

        // Response body without password
        const responseBody: IUser = {
            id: userData.id,
            userPhoto: userData.userPhoto,
            username: userData.username,
            fullName: userData.fullName,
            email: userData.email,
            role: userData.role,
            isActive: userData.isActive,
            createdAt: userData.createdAt,
            modifiedAt: userData.modifiedAt
        }

        // Success response created new user
        res.status(201).json(responseBody);
    } catch(err: any) {
        throw new Error(err);
    }
});