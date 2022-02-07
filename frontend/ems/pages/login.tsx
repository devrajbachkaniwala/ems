import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { setUserState } from "app/features/user/userSlice";
import { useAppDispatch } from "app/hooks";
import { TToken } from "types/token";
import eventService from '@/services/eventService';
import userService from "@/services/userService";
import { UserValidation } from "class/UserValidation";
import { apolloClient } from "app/graphql";
import { createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';


type TUserCredential = {
  email: string;
  password: string;
}

const initialUserCredentialState: TUserCredential = {
  email: '',
  password: ''
}

export const Login: NextPage = () => {

  const [userCredential, setUserCredential] = useState<TUserCredential>(initialUserCredentialState);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserCredential({
      ...userCredential,
      [e.target.name]: e.target.value
    });
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      //const res: TToken = await dispatch(loginUser(user)).unwrap();

      const isValidEmail = UserValidation.email(userCredential.email);

      if(!isValidEmail) {
        throw new Error('Invalid email');
      }

      if(!userCredential.password.length) {
        throw new Error('Empty password');
      }

      const res = await userService.loginUser(userCredential);
      apolloClient.resetStore();
      /* const link = createHttpLink; */
      const auth = setContext((_, { headers }) => {
        return {
          ...headers,
          authorization: `Bearer ${res.accessToken}`
        }
      });
      apolloClient.setLink(auth);
      dispatch(setUserState(res));

      setErrMsg(null);
      router.push('/');
      console.log('success');
      console.log(res);

    } catch(err: any) {
      setErrMsg(err.message);
    }
  }

  const handleTest = async () => {
    const res = await eventService.getAllEvents();
    console.log(res.data);
  }

  return (
    <div>
      login
      <h3>{errMsg}</h3>
      <form onSubmit={handleLogin}>
        <input type="email" value={userCredential.email} onChange={handleUserInput} name="email" placeholder="Email" />
        <input type="password" value={userCredential.password} onChange={handleUserInput} name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleTest}>onclick</button>
    </div>
  );
  
}

export default Login;
