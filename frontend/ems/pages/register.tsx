import { ChangeEvent, Component, FocusEvent, FormEvent, FormEventHandler } from 'react';
import { Validation } from '../class/UserValidation';
import { IUserValidateError } from '../interface/IUserValidateError';

interface IUser {
    username: string;
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    /* userPhoto: string; */
}


interface IRegisterState extends IUser {
    errMsg: string;
}

type TUser = keyof IUser;

class Register extends Component<{}, IRegisterState> {

    constructor(props: {}) {
        super(props)
    
        this.state = {
            username: '',
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            /* userPhoto: '' */
            errMsg: ''
        }
    }

    /* handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        this.handleValidation(e);

        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    } */

    /* validateUsername = (e: FocusEvent<HTMLInputElement>) => {
        const isValid = Validation.username(e.target.value);
        if(typeof isValid === 'object') {
            this.setState({
                errMsg: `${isValid.errMsg}`
            });
            return;
        }
        if(isValid) {
            this.setState({
                errMsg: '' 
            });
        }
    }
    */

    /* handleValidation = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim()
        }), () => {
            const isValid = this.validate(e.target.name as TUser, e.target.value.trim());
            if(typeof isValid === 'object') {
                this.setState({
                    errMsg: `${isValid.errMsg}`
                });
                return;
            }
            if(isValid) {
                this.setState({
                    errMsg: '' 
                });
            }
        });
    }  */

    private validate(name: TUser, value: string): boolean | IUserValidateError {
        switch(name) {
            case 'username':
                return Validation.username(value);
            case 'fullName':
                return Validation.fullName(value);
            case 'email':
                return Validation.email(value);
            case 'password':
                return Validation.password(value);
            case 'confirmPassword':
                if(this.state.password === this.state.confirmPassword) {
                    return true;
                }
                return {
                    errMsg: 'Password does not match with confirm password'
                }
            default:
                return false;
        }
    }

    handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        try {
            e.preventDefault();
            const formData: FormData = new FormData(e.target as HTMLFormElement);
            let isValid: boolean | IUserValidateError = false;

            formData.forEach((value: FormDataEntryValue, key: string) => {
                isValid = this.validate(key as TUser, value as string);
                if(typeof isValid === 'object') {
                    throw new Error(`${isValid.errMsg}`);
                }
    
            });

            if(typeof isValid === 'boolean' && !!isValid) {
                this.setState({
                    errMsg: ''
                });
                console.log('Success');
            }

        } catch(err: any) {
            this.setState({ errMsg: err.message as string });
        }
        
    }
    
    render() {
        return (
            <div className='flex justify-center'>
                
                <form className='flex flex-col p-2 max-w-md justify-center' onSubmit={this.onSubmit}>
                    {/* Profile pic left */}

                    <span className='inline-block text-red-600 text-lg'>{this.state.errMsg}</span>
                    
                    <input type='text' name='username' value={this.state.username} onChange={this.handleInput} placeholder='Username' />
                
                    <input type='text' name='fullName' value={this.state.fullName} onChange={this.handleInput} placeholder='Full Name' />
                    
                    <input type='email' name='email' value={this.state.email} onChange={this.handleInput} placeholder='Email' />
                    
                    <input type='password' name='password' value={this.state.password} onChange={this.handleInput} placeholder='Password' />
                
                    <input type='password' name='confirmPassword' value={this.state.confirmPassword} onChange={this.handleInput} placeholder='Confirm Password' />
                
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default Register;
