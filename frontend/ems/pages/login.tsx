/* eslint-disable react/no-unescaped-entities */
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { setUserState } from 'app/features/user/userSlice';
import { useAppDispatch } from 'app/hooks';
import { TTokens } from 'types/token';
import eventService from '@/services/eventService';
import userService from '@/services/authService';
import { UserValidation } from 'class/UserValidation';
import { apolloClient } from 'app/graphql';
import {
  ApolloLink,
  createHttpLink,
  from,
  HttpLink,
  NextLink,
  Operation
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Env } from 'class/Env';
import { loginUser } from 'app/features/auth/authSlice';
import Link from 'next/link';
import tokenClass from 'class/Token';
import { store } from 'app/stores/store';
import { observer } from 'mobx-react-lite';

type TFormValues = {
  email: string;
  password: string;
};

type TFormErrors = {
  email?: string | null;
  password?: string | null;
};

const initialFormValues: TFormValues = {
  email: '',
  password: ''
};

const Login: NextPage = () => {
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
  };

  const validate = async (): Promise<boolean> => {
    const isValidEmail = await UserValidation.email(formValues.email)
      .then((res) => {
        setFormErrors((prev) => ({ ...prev, email: null }));
        return res;
      })
      .catch((err) => {
        setFormErrors((prev) => ({ ...prev, email: err.message }));
        return false;
      });

    const isValidPassword = await new Promise<boolean>((resolve, reject) => {
      if (formValues.password.length) {
        resolve(true);
      } else {
        reject(false);
      }
    })
      .then((res) => {
        setFormErrors((prev) => ({ ...prev, password: null }));
        return res;
      })
      .catch((err) => {
        setFormErrors((prev) => ({
          ...prev,
          password: 'Password is required'
        }));
        return false;
      });

    if (!(isValidEmail && isValidPassword)) {
      return false;
    }

    return true;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const isValid: boolean = await validate();

      if (!isValid) {
        console.log('validation error');
        return;
      }

      console.log('success');
      setErrMsg(null);
      //await userService.loginUser(formValues);
      //dispatch(loginUser(formValues));

      //apolloClient.resetStore();
      await store.auth.loginUser(formValues);

      if (store.auth.user && !store.auth.error) {
        router.push('/');
      }
    } catch (err: any) {
      setErrMsg(err.message);
    }
  };

  const handleTest = async () => {
    try {
      const res = await userService.getUserProfile();
      console.log(res);
    } catch (err: any) {
      setErrMsg(err.message);
    }
  };

  return (
    <section className='min-h-[80vh] overflow-auto flex justify-center items-center'>
      <form onSubmit={handleLogin} className='form'>
        <h2 className='form-heading'>Login</h2>
        {errMsg && <span className='input-error'>{errMsg}</span>}
        {store.auth.error && (
          <span className='input-error'>{store.auth.error}</span>
        )}

        {formErrors.email && (
          <span className='input-error'>{formErrors.email}</span>
        )}
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            value={formValues.email}
            onChange={handleChange}
            placeholder='Email'
          />
        </div>

        {formErrors.password && (
          <span className='input-error'>{formErrors.password}</span>
        )}
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={formValues.password}
            onChange={handleChange}
            placeholder='Password'
          />
        </div>

        <button type='submit' className='btn mt-2'>
          Login
        </button>

        <div className='text-center'>
          <Link href={'/register'}>
            <a className='text-slate-700 hover:text-blue-600 focus:outline-none'>
              Don't have an account?
            </a>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default observer(Login);
