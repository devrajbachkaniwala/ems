import type { NextPage } from 'next'
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

const getUser = async () => {
  const refreshToken = localStorage.getItem('auth');
  const res = await fetchAccessToken(refreshToken!);
  const user = await userService.getUserProfile();
  return user;
}

const fetchAccessToken = async (refreshtoken: string) => {
  const res = await tokenService.getNewAccessToken(refreshtoken);
  tokenClass.setAccessToken(res.accessToken);
  //setAuthorizationHeader(res.accessToken);
  return res;
}

const Home: NextPage = () => {
  const user = useAppSelector(state => state.user.value);
  const dispatch = useAppDispatch();
  console.log('render outside');
  useEffect(() => {
   /*  getUser().then(res => {
      console.log(res);
      dispatch(setUserState(res.user)); 
    });
    
    console.log('in useEffect'); */
    //tokenClass.setAccessToken('hello');
    //console.log(tokenClass.getAccessToken());
    getUser().then(res => console.log(res));
  }, [dispatch]);


  const handleLogout = async () => {
    const res = await axios.post(`${Env.authUrl}/logout`, null, { withCredentials: true });
    console.log(res.status);
  }
  

  const onClick = async () => {
    try {
      const res = await tokenService.getNewAccessToken(tokenClass.getRefreshTokenFromLocalStorage());
      //setAuthorizationHeader(res.accessToken);
      console.log(apolloClient.link);
      const result = await userService.getUserProfile();
    } catch(err: any) {
      console.log(err.message);
    }
  }

  if(!user) {
    return (
      <div>no user
      <button onClick={onClick}>ON CLICK</button>
      <button onClick={handleLogout}>Logout</button>

      </div>
    )
  }

  return (
    <div className='text-center font-semibold'>
      Hello world
      <img src={user.userPhoto ? user.userPhoto : ''} alt={user.username} />
      <h3>{user.id && user.id}</h3>
      <h3>{user.username}</h3>
      <h3>{user.fullName}</h3>
      <h3>{user.email}</h3>
      <h3>{user.role}</h3>
      <h3>{user.createdAt}</h3>
      <h3>{user.modifiedAt}</h3>
      <button onClick={onClick}>ON CLICK</button>
    </div>
  );
};

export default Home;