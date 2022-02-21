/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import eventService from '@/services/eventService';
import { apolloClient } from 'app/graphql';
import userService from '@/services/userService';
import tokenService from '@/services/tokenService';
import { setUserState } from 'app/features/user/userSlice';
import tokenClass from 'class/Token';
import axios from 'axios';
import { Env } from 'class/Env';
import Header from 'components/header';
import Image from 'next/image';
import Footer from 'components/footer';
import eventStyles from 'styles/event.module.css';
import Link from 'next/link';

const getUser = async () => {
  const refreshToken = localStorage.getItem('auth');
  const res = await fetchAccessToken(refreshToken!);
  const user = await userService.getUserProfile();
  return user;
};

const fetchAccessToken = async (refreshtoken: string) => {
  const res = await tokenService.getNewAccessToken(refreshtoken);
  tokenClass.setAccessToken(res.accessToken);
  //setAuthorizationHeader(res.accessToken);
  return res;
};

const Home: NextPage = () => {
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const res = await axios.post(`${Env.authUrl}/logout`, null, {
      withCredentials: true
    });
    console.log(res.status);
  };

  const onClick = async () => {
    try {
      //const res = await tokenService.getNewAccessToken(tokenClass.getRefreshTokenFromLocalStorage());
      //setAuthorizationHeader(res.accessToken);
      console.log(apolloClient.link);
      const result = await userService.getUserProfile();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <>
      <figure aria-label='landing-page-photo'>
        <img
          src={'/images/landing-page-photo.jpg'}
          alt='landing-page-photo'
          className='w-full h-[60vh] object-cover object-[0px_80%]'
        />
      </figure>

      <nav
        aria-label='event-navigation'
        className='mx-3 sm:mx-7 mt-7 sm:px-7 overflow-auto'
      >
        <ul className='flex flex-row items-stretch text-gray-500 font-semibold'>
          <li className={`${eventStyles.listItem} ${eventStyles.selected}`}>
            All
          </li>
          <li className={eventStyles.listItem}>Today</li>
          <li className={eventStyles.listItem}>Free</li>
          <li className={eventStyles.listItem}>Music</li>
          <li className={eventStyles.listItem}>Food & Drink</li>
          <li className={eventStyles.listItem}>Charity & Causes</li>
        </ul>
      </nav>

      <main className='sm:mx-3 my-14 sm:px-7'>
        <div className='h-fit flex flex-row flex-wrap justify-center lg:justify-start'>
          <article className='min-h-[320px] min-w-[300px] relative m-4 bg-slate-50 overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-300 hover:cursor-pointer'>
            <figure>
              <img
                src='/images/landing-page-photo.jpg'
                alt='test-photo'
                className='w-full h-[120px] object-cover object-center'
              />
            </figure>
            <section className='mt-4 px-3 text-gray-700'>
              <h2 className='text-xl font-bold'>Event Name</h2>
              <p className='my-2 font-semibold'>Sat, Feb 19</p>
              <div className='text-sm'>
                <p>Surat, GJ</p>
                <p>Free</p>
              </div>
            </section>
            <footer className='px-3 mb-3 absolute bottom-2'>
              <h3>Host Name</h3>
            </footer>
          </article>

          <article className='min-h-[320px] min-w-[300px] relative m-4 bg-slate-50 overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-300 hover:cursor-pointer'>
            <figure>
              <img
                src='/images/landing-page-photo.jpg'
                alt='test-photo'
                className='w-full h-[120px] object-cover object-center'
              />
            </figure>
            <section className='mt-4 px-3 text-gray-700'>
              <h2 className='text-xl font-bold'>Event Name</h2>
              <p className='my-2 font-semibold'>Sat, Feb 19</p>
              <div className='text-sm'>
                <p>Surat, GJ</p>
                <p>Free</p>
              </div>
            </section>
            <footer className='px-3 mb-3 absolute bottom-2'>
              <h3>Host Name</h3>
            </footer>
          </article>

          <article className='min-h-[320px] min-w-[300px] relative m-4 bg-slate-50 overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-300 hover:cursor-pointer'>
            <figure>
              <img
                src='/images/landing-page-photo.jpg'
                alt='test-photo'
                className='w-full h-[120px] object-cover object-center'
              />
            </figure>
            <section className='mt-4 px-3 text-gray-700'>
              <h2 className='text-xl font-bold'>Event Name</h2>
              <p className='my-2 font-semibold'>Sat, Feb 19</p>
              <div className='text-sm'>
                <p>Surat, GJ</p>
                <p>Free</p>
              </div>
            </section>
            <footer className='px-3 mb-3 absolute bottom-2'>
              <h3>Host Name</h3>
            </footer>
          </article>

          <article className='min-h-[320px] min-w-[300px] relative m-4 bg-slate-50 overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-300 hover:cursor-pointer'>
            <figure>
              <img
                src='/images/landing-page-photo.jpg'
                alt='test-photo'
                className='w-full h-[120px] object-cover object-center'
              />
            </figure>
            <section className='mt-4 px-3 text-gray-700'>
              <h2 className='text-xl font-bold'>Event Name</h2>
              <p className='my-2 font-semibold'>Sat, Feb 19</p>
              <div className='text-sm'>
                <p>Surat, GJ</p>
                <p>Free</p>
              </div>
            </section>
            <footer className='px-3 mb-3 absolute bottom-2'>
              <h3>Host Name</h3>
            </footer>
          </article>

          <article className='min-h-[320px] min-w-[300px] relative m-4 bg-slate-50 overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-300 hover:cursor-pointer'>
            <figure>
              <img
                src='/images/landing-page-photo.jpg'
                alt='test-photo'
                className='w-full h-[120px] object-cover object-center'
              />
            </figure>
            <section className='mt-4 px-3 text-gray-700'>
              <h2 className='text-xl font-bold'>Event Name</h2>
              <p className='my-2 font-semibold'>Sat, Feb 19</p>
              <div className='text-sm'>
                <p>Surat, GJ</p>
                <p>Free</p>
              </div>
            </section>
            <footer className='px-3 mb-3 absolute bottom-2'>
              <h3>Host Name</h3>
            </footer>
          </article>
        </div>
        <div className='text-center my-4'>
          <Link href='/events'>
            <a className='inline-block py-1 px-3 w-52 border-2 border-slate-300 hover:border-slate-500 hover:bg-slate-50 transition duration-200 ease-linear'>
              See more
            </a>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
