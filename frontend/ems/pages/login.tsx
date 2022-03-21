/* eslint-disable react/no-unescaped-entities */
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react';
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
import { store } from 'app/stores';
import { observer } from 'mobx-react-lite';
import authService from '@/services/authService';
import Header from 'components/header';
import Footer from 'components/footer';
import { TPageLayout } from 'types/pageLayout';
import LoadingSpinner from 'components/loadingSpinner';

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

const Login: NextPage & TPageLayout = () => {
  const [formValues, setFormValues] = useState<TFormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<TFormErrors>({});
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    if (store.auth.user?.id) {
      router.replace('/');
      return;
    }
    authService
      .getUserProfile()
      .then((userDetail) => {
        router.replace('/');
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [router]);

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
    setErrMsg(null);
    apolloClient.resetStore();
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
      //await store.auth.loginUser(formValues);

      const res = await authService.loginUser(formValues);
      sessionStorage.setItem('accessToken', res.accessToken);
      const user = await authService.getUserProfile();
      if (user.isActive) {
        if (user.id) {
          localStorage.setItem('refreshToken', res.refreshToken);
          store.auth.setUser(user);
          router.replace('/');
        }
      } else {
        await authService.logout(res.refreshToken);
        sessionStorage.clear();
        setErrMsg('Account is Disabled');
      }
    } catch (err: any) {
      setErrMsg(err.message);
    }
  };

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section className='min-h-[80vh] overflow-auto flex justify-center items-center'>
      <form onSubmit={handleLogin} className='form'>
        <h2 className='form-heading'>Login</h2>
        {errMsg && <div className='input-error text-center'>{errMsg}</div>}

        {formErrors.email && (
          <div className='w-full flex justify-between'>
            <div></div>
            <div className='input-error w-[200.8px]'>{formErrors.email}</div>
          </div>
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
          <div className='w-full flex justify-between'>
            <div></div>
            <div className='input-error w-[200.8px]'>{formErrors.password}</div>
          </div>
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

export default Login;

Login.getLayout = (page: any) => {
  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
};
