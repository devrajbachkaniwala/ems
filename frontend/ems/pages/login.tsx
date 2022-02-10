import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { setUserState } from "app/features/user/userSlice";
import { useAppDispatch } from "app/hooks";
import { TTokens } from "types/token";
import eventService from '@/services/eventService';
import userService from "@/services/userService";
import { UserValidation } from "class/UserValidation";
import { apolloClient } from "app/graphql";
import { ApolloLink, createHttpLink, from, HttpLink, NextLink, Operation } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { Env } from "class/Env";
import { setAuth } from "app/features/auth/authSlice";


type TFormValues = {
  email: string;
  password: string;
}

type TFormErrors = {
  email?: string | null;
  password?: string | null;
}

const initialFormValues: TFormValues = {
  email: '',
  password: ''
}

export const Login: NextPage = () => {

  const [formValues, setFormValues] = useState<TFormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<TFormErrors>({});
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  }

  const validate = async (): Promise<boolean> => {
    const isValidEmail = await UserValidation.email(formValues.email)
                        .then(res => {
                            setFormErrors( prev => ({ ...prev, email: null }) );
                            return res; 
                          })
                        .catch(err => { 
                          setFormErrors( prev => ({ ...prev, email: err.message }) );
                          return false;
                        });
    
    
    const isValidPassword = await new Promise<boolean>((resolve, reject) => {
                            if(formValues.password.length) {
                              resolve(true);
                            } else {
                              reject(false);
                            }
                          })
                            .then(res => {
                              setFormErrors(prev => ({ ...prev, password: null }));
                              return res;
                            })
                            .catch(err => {
                              setFormErrors(prev => ({ ...prev, password: 'Password is required' }));
                              return false;
                            });
    
    
    if( !(isValidEmail && isValidPassword) ) {
      return false;
    }

    return true;
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const isValid: boolean = await validate();

      if(!isValid) {
        console.log('validation error');
        return;
      }
      
      const token: TTokens = await userService.loginUser(formValues);
      localStorage.setItem('auth', token.refreshToken);
      setErrMsg(null);

      apolloClient.resetStore();

      /* const authMiddleware = new ApolloLink((operation : Operation, forward: NextLink) => {
        const headers: { authorization: string } = {
          authorization: `${token.tokenType} ${token.accessToken}`
        };
        console.log('authLink operation');
        operation.setContext((req: any, prevCtx: any) => ({ ...prevCtx, headers }));
        return forward(operation).map(data => {
          console.log('after operation execution');
          return data;
        });
      });

      const aditiveLink = from([ authMiddleware, new HttpLink({ uri: Env.apiUrl }) ]);
      apolloClient.setLink(aditiveLink); */
      
      router.push('/');
    } catch(err: any) {
      setErrMsg(err.message);
    }
  }

  const handleTest = async () => {
    try {
      const res = await userService.getUserProfile();
      console.log(res);
    } catch(err: any) {
      setErrMsg(err.message);
    }
  }

  return (
    <div>
      login
      <form onSubmit={handleLogin}>
        {errMsg}
        
        <span className="text-red-600 text-lg">{formErrors.email && formErrors.email}</span>
        <input type="email" value={formValues.email} onChange={handleChange} name="email" placeholder="Email" />
        
        <span className="text-red-600 text-lg">{formErrors.password && formErrors.password}</span>
        <input type="password" value={formValues.password} onChange={handleChange} name="password" placeholder="Password" />
        
        <button type="submit">Login</button>
      </form>
      <button onClick={handleTest}>onclick</button>
    </div>
  );
  
}

export default Login;
