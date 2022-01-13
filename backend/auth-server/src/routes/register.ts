import { Request, Response, Router } from "express";
import { User } from "../entity/User";
import { IRegisterUser, IUser } from "../interface/IUser";
import { hash } from 'bcryptjs';
import { IValidateError } from "../interface/IValidateError";
import { Validation } from "../class/Validation";

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
        
        // Validating email
        const isEmailValid: boolean | IValidateError = Validation.email(newUser.email);
        if(typeof isEmailValid === 'object') {
            return res.status(400).json({ errorCode: 'Email error', message: `${isEmailValid.errMsg}` });
        }

        // Validating password
        const isPassValid: boolean | IValidateError = Validation.password(newUser.password);
        if(typeof isPassValid === 'object') {
            return res.status(400).json({ errorCode: 'Password error', message: `${isPassValid.errMsg}`});
        }
    
        // Finding if email provided by user exists in the database
        const emailExist: User | undefined = await User.findOne({ where: { email: newUser.email } });
    
        // If user email exists then send the response Email already exists
        if(emailExist) {
            return res.status(400).json({ errorCode: 'Email error', message: 'Email already exists' });
        }
    
        // Validating username
        const isUsernameValid: boolean | IValidateError = Validation.username(newUser.username);
        if(typeof isUsernameValid === 'object') {
            return res.status(400).json({ errorCode: 'Username error', message: `${isUsernameValid.errMsg}` });
        }
        
        // Validating fullName
        const isFullNameValid: boolean | IValidateError = Validation.fullName(newUser.fullName);
        if(typeof isFullNameValid === 'object') {
            return res.status(400).json({ errorCode: 'Full Name error', message: `${isFullNameValid.errMsg}` });
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