import type { NextPage } from 'next'
import { useEffect } from 'react';
import { useAppSelector } from '../app/hooks';
import eventService from '@/services/eventService';

const getEvents = async () => {
  const events = await eventService.getAllEvents();
  return events;
}

const Home: NextPage = () => {
  const user = useAppSelector(state => state.user.value);

  if(!user) {
    return <div>No user</div>
  }

  return (
    <div className='text-center font-semibold'>
      Hello world
    </div>
  );
};

export default Home;