/* eslint-disable react/no-unescaped-entities */
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react';
import AuthService from '@/services/authService';
import { UserValidation } from 'class/UserValidation';
import Link from 'next/link';
import authService from '@/services/authService';
import { apolloClient } from 'app/graphql';
import { store } from 'app/stores';
import { Header } from 'components/header';
import { Footer } from 'components/footer';
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

const Login: NextPage & { getLayout: (page: any) => ReactNode } = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formValues, setFormValues] = useState<TFormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<TFormErrors>({});
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    /* if (
      localStorage.getItem('refreshToken') ||
      sessionStorage.getItem('accessToken')
    ) {
      router.replace('/');
    } else {
      setIsLoading(false);
    } */

    authService
      .getUserProfile()
      .then((user) => {
        if (user.id) {
          router.replace('/');
        }
      })
      .catch((err) => {
        //console.log(err);
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
      /* await store.auth.loginUser(formValues);

      if (store.auth.user && !store.auth.error) {
        router.push('/');
      } */
      const res = await authService.loginUser(formValues);
      sessionStorage.setItem('accessToken', res.accessToken);
      const user = await authService.getUserProfile();
      console.log(user);
      if (user.role === 'admin') {
        if (res.accessToken) {
          console.log(res);
          store.auth.setUser(user);
          localStorage.setItem('refreshToken', res.refreshToken);
          setIsLoading(true);
          router.replace('/');
          return;
        }
        return;
      } else {
        sessionStorage.clear();
        await authService.logout(res.refreshToken);
      }
      setErrMsg('Not an Admin');
    } catch (err: any) {
      setErrMsg(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-[100vh] overflow-auto flex justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section className='min-h-[80vh] overflow-auto flex justify-center items-center'>
      <form
        onSubmit={handleLogin}
        className='flex flex-col justify-center items-center w-[400px] p-2 text-slate-700 shadow-xl shadow-slate-300 rounded-xl'
      >
        <h2 className='mb-4 text-xl font-bold'>Admin Login</h2>
        {errMsg && (
          <div className='text-center text-red-600 font-medium'>{errMsg}</div>
        )}
        {/* store.auth.error && (
          <span className='input-error'>{store.auth.error}</span>
        ) */}

        {formErrors.email && (
          <div className='flex justify-between items-center w-full'>
            <div className=''></div>
            <div className='w-[50%] text-red-600 font-medium'>
              {formErrors.email}
            </div>
          </div>
        )}
        <div className='flex justify-between items-center w-full mb-3'>
          <label htmlFor='email' className='py-1'>
            Email
          </label>
          <input
            id='email'
            type='email'
            name='email'
            value={formValues.email}
            onChange={handleChange}
            placeholder='Enter email'
            className='px-2 py-1 border-2 border-slate-400 rounded-xl hover:border-slate-700 focus:border-slate-700 transition-all duration-200 ease-out'
          />
        </div>

        {formErrors.password && (
          <div className='flex justify-between items-center w-full'>
            <div></div>
            <div className='w-[50%] text-red-600 font-medium'>
              {formErrors.password}
            </div>
          </div>
        )}
        <div className='flex justify-between items-center w-full'>
          <label htmlFor='password' className='py-1'>
            Password
          </label>
          <input
            id='password'
            type='password'
            name='password'
            value={formValues.password}
            onChange={handleChange}
            placeholder='Enter password'
            className='px-2 py-1 border-2 border-slate-400 rounded-xl hover:border-slate-700 focus:border-slate-700 transition-all duration-200 ease-out'
          />
        </div>

        <button
          type='submit'
          className='mt-4 py-1 w-full rounded-xl text-lg bg-green-700 text-white hover:bg-green-600 hover:text-black outline-none active:outline-green-700 focus:outline-none transition-all duration-200 ease-out'
        >
          Login
        </button>

        {/* <div className='text-center'>
          <Link href={'/register'}>
            <a className='text-slate-700 hover:text-blue-600 focus:outline-none'>
              Don't have an account?
            </a>
          </Link>
        </div> */}
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
