import userService from '@/services/userService';
import { validate } from 'graphql';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, FocusEventHandler, FormEvent, FormEventHandler, useRef, useState } from 'react';
//import { registerUser } from '../app/features/user/userSlice';
import { useAppDispatch } from '../app/hooks';
import { UserValidation } from '../class/UserValidation';
import { TRegisterUser, TUser } from '../types/user';
import { TValidateError } from '../types/validateError';

type TFormValues = TRegisterUser & { confirmPassword: string; };

type TFormErrors = {
    username?: string | null;
    fullName?: string | null;
    email?: string | null;
    password?: string | null;
    confirmPassword?: string | null;
    userPhoto?: string | null;
};

type TUserFields = Exclude<keyof TFormValues, 'userPhoto'>;

/* type TValue<T = string> = {
    value: T;
}

type TFormUser = {
    username: TValue<string>,
    fullName: TValue<string>;
    email: TValue<string>;
    password: TValue<string>;
    confirmPassword: TValue<string>;
    userPhoto: TValue<File>;
} */

const Register: NextPage = () => {
    const initialFormValues: TFormValues = {
        username: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userPhoto: null,
    };

    const [formValues, setFormValues] = useState<TFormValues>(initialFormValues);
    const [formErrors, setFormErrors] = useState<TFormErrors>({});
    const [isSubmit, setIsSubmit] = useState<boolean>(true);
    const [errMsg, setErrMsg] = useState<string | null>(null);
    //const imgRef = useRef<HTMLInputElement | null>(null);
    
    //const dispatch = useAppDispatch();

    const router = useRouter();

    /* const validations = (name: TUserFields, value: string): boolean | TValidateError => {
        let errors: any = {};
        switch(name) {
            case 'username':
                const isValidUsername = UserValidation.username(value);
                if(typeof isValidUsername === 'object') {
                    errors.username = isValidUsername.errMsg
                }
            case 'fullName':
                return UserValidation.fullName(value);
            case 'email':
                //const res = UserValidation.email(value).then(res => res).catch(err => err);
                //return res;
                return false;    
            case 'password':
                return UserValidation.password(value);
            case 'confirmPassword':
                if(!formValues.confirmPassword.length) {
                    //throw new Error('Password is required');
                    return {
                        errMsg: 'Password is required'
                    };
                }
                if(formValues.password === formValues.confirmPassword) {
                    return true;
                }
                //throw new Error('Confirm Password does not match with password');
                return {
                    errMsg: 'Password does not match with confirm password'
                };
            default:
                //throw new Error('Field name not present while validating');
                return {
                    errMsg: 'Field name not present while validating'
                };
        }
    } */

    const imageValidator = (imgFile: File): boolean => {
        if(!imgFile.type.startsWith('image/')) {
            throw new Error('File should be an image');
        }
        if(imgFile.size > 2_097_152) {
            throw new Error('Image size should be less than 2MB');
        }
        return true;
    }

    const setUserPhoto = (imgFile: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onload = () => {
            setFormValues({
                ...formValues,
                userPhoto: reader.result
            });
        }
    }

    const handleUserPhoto = (e: ChangeEvent<HTMLInputElement>): void => {
        try {
            setFormValues({
                ...formValues,
                userPhoto: null
            });
            if(!e.target.files?.length) {
                setIsSubmit(true);
                setFormErrors({
                    ...formErrors,
                    userPhoto: null
                });
                return;
            }
    
            const file: File = e.target.files[0];
    
            const isValidImg = imageValidator(file);

            if(isValidImg) {
                setFormErrors({
                    ...formErrors,
                    userPhoto: null
                });
            }
            setIsSubmit(true);
            setUserPhoto(file);
        } catch(err: any) {
            setFormErrors({
                ...formErrors,
                userPhoto: err.message
            });
            setIsSubmit(false);
        }

    }

    /* const handleUserInput = (e: ChangeEvent<HTMLInputElement>): void => { 
        // Form values are tracked except file input
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    } */


    /* const onRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData: FormData = new FormData(e.target as HTMLFormElement);
            let isValid: boolean | TValidateError = false;

            const userPhoto: FormDataEntryValue | null = formData.get('userPhoto');

            if(userPhoto instanceof File && userPhoto.size > 0) {
                const isImgValid: boolean | TValidateError = imageValidator(userPhoto);
                if(typeof isImgValid === 'object') {
                    throw new Error(`${isImgValid.errMsg}`);
                }
            }

            formData.forEach((value: FormDataEntryValue, key: string) => {
                if(key === 'userPhoto') {
                    return;
                }
                
                isValid = validate(key as TUserFields, value as string);
                
                if(typeof isValid === 'object') {
                    throw new Error(`${isValid.errMsg}`);
                }
            });
            
            if(!isValid) {
                console.log('validation error');
                return;
            }

            setErrMsg(null);

            const newUser: TRegisterUser & { confirmPassword?: string } = { ...user }
            delete newUser.confirmPassword

            try {
                const res: TUser = await userService.registerUser(user);
                router.push('/login');
                console.log('Success');
            } catch(err: any) {
                setErrMsg(err.message);
            }
            
        } catch(err: any) {
            setErrMsg(err.message as string);
        }
        
    } */

    /* const onRegister: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const form = e.target as typeof e.target & TFormUser;

        if(errMsg) {
            console.log('error');
            return;
        }
        console.log('success');
    }    */

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    } 

   /*  const onBlur: FocusEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target
        try {
            validations(name as TUserFields, value);
            
            setIsSubmit(true);
            
            setFormErrors({
                ...formErrors,
                [name]: null
            });
        } catch(err: any) {
            setFormErrors({
                ...formErrors,
                [name]: err.message
            });

            setIsSubmit(false);
        }
    } */

    /* const validate = ({ username, fullName, email, password, confirmPassword }: TFormValues) => {
        const isValidUsername = UserValidation.username(username);

       /*  if(typeof isValidUsername === 'object') {
            setFormErrors({
                ...formErrors,
                username: isValidUsername.errMsg
            });
        } 


        const isValidFullName = UserValidation.fullName(fullName);
        const isValidEmail = UserValidation.email(email);
        const isValidPassword = UserValidation.password(password);

        if(!confirmPassword.length) {
            throw new Error('Confirm Password is required');
        }

        if(password !== confirmPassword) {
            throw new Error('Confirm Password does not match Password');
        }

        return true;
    } */

    const validate = async (): Promise<boolean> => {
        const isValidUsername = await UserValidation.username(formValues.username).then(res => { setFormErrors(prev => ({ ...prev, username: null })); return res; }).catch(err => setFormErrors(prev => ({ ...prev, username: err.message })));
        const isValidFullName = await UserValidation.fullName(formValues.fullName).then(res => { setFormErrors(prev => ({ ...prev, fullName: null })); return res; }).catch(err => setFormErrors(prev => ({ ...prev, fullName: err.message })));;
        const isValidEmail = await UserValidation.email(formValues.email).then(res => { setFormErrors(prev => ({ ...prev, email: null })); return res; }).catch(err => setFormErrors(prev => ({ ...prev, email: err.message })));
        const isValidPassword = await UserValidation.password(formValues.password).then(res => { setFormErrors(prev => ({ ...prev, password: null })); return res; }).catch(err => setFormErrors(prev => ({ ...prev, password: err.message })));;
        const isValidConfirmPassword = await UserValidation.confirmPassword(formValues.confirmPassword, formValues.password).then(res => { setFormErrors(prev => ({ ...prev, confirmPassword: null })); return res; }).catch(err => setFormErrors(prev => ({ ...prev, confirmPassword: err.message })));;
        
        if( !(isSubmit && isValidUsername && isValidFullName && isValidEmail && isValidPassword && isValidConfirmPassword) ) {
            return false;
        }
        return true;
    }


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
    
            const isValidCredentials = await validate();
    
            if(!isValidCredentials) {
                console.log('error');
                return;
            }
    
            const res = await userService.registerUser(formValues);
            
            console.log(res);
            setErrMsg(null);

            console.log('success outside');

            router.push('/login');
        } catch(err: any) {
            setErrMsg(err.message);
        }
        
    }
    
        
    return (
        <div className='flex justify-center items-center'>
            {isSubmit.toString()}            
            <form className='flex flex-col p-2 max-w-md justify-center shadow-md' onSubmit={handleSubmit}>
                {/* Profile pic left */}
                <span className='inline-block text-red-600 text-xl'>{errMsg}</span>

                <span className='inline-block text-red-600 text-lg'>{formErrors.userPhoto && formErrors.userPhoto}</span>
                

                <div className='' >
                    <img src={`${formValues.userPhoto ? formValues.userPhoto : ''}`} alt="test-image" className='rounded-full w-36 object-cover' />
                    <input type="file" name="userPhoto" className='' onChange={handleUserPhoto} />
                </div>

                <span className='inline-block text-red-600 text-lg'>{formErrors.username && formErrors.username}</span>
                <input type='text' name='username' value={formValues.username} onChange={handleChange} placeholder='Username' />
            
                <span className='inline-block text-red-600 text-lg'>{formErrors.fullName && formErrors.fullName}</span>
                <input type='text' name='fullName' value={formValues.fullName} onChange={handleChange} placeholder='Full Name' />
                
                <span className='inline-block text-red-600 text-lg'>{formErrors.email && formErrors.email}</span>
                <input type='email' name='email' value={formValues.email} onChange={handleChange} placeholder='Email' />
                
                <span className='inline-block text-red-600 text-lg'>{formErrors.password && formErrors.password}</span>
                <input type='password' name='password' value={formValues.password} onChange={handleChange} placeholder='Password' />
            
                <span className='inline-block text-red-600 text-lg'>{formErrors.confirmPassword && formErrors.confirmPassword}</span>
                <input type='password' name='confirmPassword' value={formValues.confirmPassword} onChange={handleChange} placeholder='Confirm Password' />
            
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
    
}

export default Register;
