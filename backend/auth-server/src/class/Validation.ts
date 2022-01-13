import { IValidateError } from "../interface/IValidateError";

// Validation class to validate fields
export class Validation {

    // Email validator
    static email(email: string): boolean | IValidateError {
        const emailRegExp: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
        if(!emailRegExp.test(email)) {
            return { errMsg: 'Invalid email' };
        }
    
        if(email.length > 150) {
            return { errMsg: 'Email length should be less than or equal to 150' };
        }
    
        return true;
    }

    // Password validator
    static password(password: string): boolean | IValidateError {
        const passwordRegExp: RegExp = new RegExp(`^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_‘{|}~]).{8,20}$`, 'g');
    
        if(password.length < 8) {
            return { errMsg: 'Password should be at least 8 characters' };
        }
    
        if(password.length > 20) {
            return { errMsg: 'Password should be at most 20 characters' };
        }
    
        if(!passwordRegExp.test(password)) {
            return { errMsg: 'Password should contain uppercase, lowercase, digit, symbol' };
        }
    
        return true;
    }

    // Username validator
    static username(username: string): boolean | IValidateError {
        const usernameRegExp: RegExp = /^\w{5,100}$/;
        
        if(username.length < 5) {
            return { errMsg: 'Username should be at least 5 characters' }
        }
    
        if(username.length > 100) {
            return { errMsg: 'Username should be at most 100 characters' }
        }
    
        if(!usernameRegExp.test(username)) {
            return { errMsg: 'Username can be uppercase, lowercase, digit or can contain underscore' }
        }
    
        return true;
    }

    // FullName validator
    static fullName(fullName: string): boolean | IValidateError {
        const fullNameRegExp: RegExp = /^[a-zA-Z]{5,100}/;

        if(fullName.length < 5) {
            return { errMsg: 'FullName should be at least 5 characters' }
        }
    
        if(fullName.length > 100) {
            return { errMsg: 'FullName should be at most 100 characters' }
        }
    
        if(!fullNameRegExp.test(fullName)) {
            return { errMsg: 'FullName can be uppercase or lowercase' }
        }

        return true;
    }

}