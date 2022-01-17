import { Component } from 'react';

interface IRegisterState {
    username: string;
    fullName: string;
    email: string;
    password: string;
    userPhoto: string;
}

class Register extends Component< null, IRegisterState> {

    constructor(props: any) {
        super(props)
    
        this.state = {
            username: '',
            fullName: '',
            email: '',
            password: '',
            userPhoto: ''
        }
    }
    
    

    render() {
        return (
            <div>
                <form className="flex flex-col">
                
                <input type="text" name="username" onChange={registerUser} onBlur={userInputError} placeholder="Username" />
                { err.errUsername && <div>{err.errUsername}</div> } 
             
                {/* Profile pic left */}
            
                <input type="text" name="fullName" onChange={registerUser} placeholder="Full Name" />
                { err.errFullName && <div>{err.errFullName}</div> } 
                
                <input type="text" name="email" onChange={registerUser} placeholder="Email" />
                { err.errEmail && <div>{err.errEmail}</div> } 
                
                <input type="password" name="password" onChange={registerUser} placeholder="Password" />
                { err.errPassword && <div>{err.errPassword}</div> } 
            
                <input type="password" name="confirmPassword" onChange={registerUser} placeholder="Confirm Password" />
                { err.errPassword && <div>{err.errPassword}</div> } 
            
            </form>
            </div>
        )
    }
}

export default Register;
