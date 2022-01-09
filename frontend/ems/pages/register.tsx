import type { NextPage } from "next";
import { EventHandler, useEffect, useRef, useState } from "react";

const Register: NextPage = () => {

    const [ user, setUser ] = useState({
        username: '',
        fullName: '',
        email: '',
        password: ''
    }); 

    const [ err, setErr ] = useState({
        errUsername: '',
        errFullName: '',
        errEmail: '',
        errPassword: ''
    });

    const usernameRef = useRef();

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    const registerUser = (e: any): void => {
        e.preventDefault();
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const userInputError = (e: any): void => {
        if(e.target.name === 'username') {
            if(e.target.value.length < 5) {
                setErr({
                    ...err,
                    errUsername: 'Username should be atleast 5 characters'
                });
            } else if (e.target.value.length >= 5) {
                setErr({
                    ...err,
                    errUsername: ''
                });
            }
        }
    }

    return (
        <div>
            <div>
                <form className="flex flex-col">
                
                    <input type="text" name="username" onChange={registerUser} onBlur={userInputError} ref={usernameRef} placeholder="Username" />
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
        </div>
    );
};

export default Register;

