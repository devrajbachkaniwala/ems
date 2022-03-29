/* eslint-disable @next/next/no-img-element */
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage
} from 'next';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import eventService from '@/services/eventService';
import { apolloClient } from 'app/graphql';
import userService from '@/services/authService';
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
import {
  EventList,
  EventList_events
} from '@/services/eventService/__generated__/EventList';
import { dateFormatter } from 'utils/dateFormatter';
import { store } from 'app/stores';
import { observer } from 'mobx-react-lite';
import { isFreeEvent } from 'utils/isFreeEvent';
import { TPageLayout } from 'types/pageLayout';
import { ProtectedRoute } from 'components/protectedRoute';

type THomeProps = {
  events: EventList_events[];
};

const eventNavlist = [
  'all',
  'today',
  'free',
  'music',
  'food & drink',
  'charity & causes'
];

const Home: NextPage<THomeProps> & TPageLayout = ({ events }) => {
  const [searchedEventList, setSearchedEventList] =
    useState<EventList_events[]>(events);

  const [currEventNavIdx, setCurrEventNavIdx] = useState<number>(0);

  const eventNavList = (idx: number) => {
    setCurrEventNavIdx(idx);
    switch (idx) {
      case 0:
        setSearchedEventList(events);
        break;
      case 1:
        setSearchedEventList(
          events.filter((event) => {
            if (event.timings?.length) {
              const isAvailable = event.timings.find(
                (timing) =>
                  new Date(timing.date).getDate() === new Date().getDate()
              );
              return isAvailable ? true : false;
            }
            return false;
          })
        );
        break;
      case 2:
        setSearchedEventList(
          events.filter((event) => {
            if (event.prices?.length) {
              const isAvailable = event.prices.find(
                (price) => price.price == 0
              );
              return isAvailable ? true : false;
            }
            return false;
          })
        );
        break;
      case 3:
        setSearchedEventList(
          events.filter((event) =>
            event.category.toLowerCase().includes('music')
          )
        );
        break;
      case 4:
        setSearchedEventList(
          events.filter(
            (event) =>
              event.category.toLowerCase().includes('food') ||
              event.category.toLowerCase().includes('drink')
          )
        );
        break;
      case 5:
        setSearchedEventList(
          events.filter(
            (event) =>
              event.category.toLowerCase().includes('charity') ||
              event.category.toLowerCase().includes('causes')
          )
        );
        break;
    }
  };

  return (
    <div>
      <figure aria-label='landing-page-photo'>
        <img
          src={'/images/landing-page-photo.jpg'}
          alt='landing-page-photo'
          className='w-full h-[60vh] object-cover object-[0px_80%]'
        />
      </figure>

      <nav
        aria-label='event-navigation'
        className='mx-3 sm:mx-7 mt-7 sm:px-7 overflow-auto fade-in'
      >
        <ul className='flex flex-row items-stretch text-gray-500 font-semibold'>
          {eventNavlist.map((navItem, index) => {
            return (
              <li
                key={index}
                className={`${eventStyles.listItem} capitalize ${
                  index === currEventNavIdx ? `${eventStyles.selected}` : ''
                }`}
                onClick={() => eventNavList(index)}
              >
                {navItem}
              </li>
            );
          })}
          {/* <li className={`${eventStyles.listItem} ${eventStyles.selected}`}>
            All
          </li>
          <li className={eventStyles.listItem}>Today</li>
          <li className={eventStyles.listItem}>Free</li>
          <li className={eventStyles.listItem}>Music</li>
          <li className={eventStyles.listItem}>Food & Drink</li>
          <li className={eventStyles.listItem}>Charity & Causes</li> */}
        </ul>
      </nav>

      <main className='sm:mx-3 my-14 sm:px-7 fade-in'>
        <div className='h-fit flex flex-row flex-wrap justify-start '>
          {searchedEventList?.length ? (
            <>
              {searchedEventList.map((event) => {
                return (
                  <div
                    key={event.id}
                    className='w-full md:w-[50%] lg:w-[33%] px-2 flex justify-center fade-in'
                  >
                    {event.organization &&
                      event.prices?.length &&
                      event.photos?.length &&
                      event.timings?.length && (
                        <Link href={`/events/${event.id}`} passHref>
                          <article className='min-h-[450px] w-full m-2 relative bg-slate-50 overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-300 hover:cursor-pointer'>
                            <figure>
                              <img
                                src={event.photos[0].photo}
                                alt={event.name}
                                className='w-full h-[200px] object-cover object-center'
                              />
                            </figure>
                            <section className='mt-4 px-3 text-gray-700'>
                              <h2 className='text-xl font-bold'>
                                {event.name}
                              </h2>
                              <p className='my-2 font-semibold'>
                                {dateFormatter(new Date(event.timings[0].date))}
                              </p>
                              <div className='text-sm'>
                                <p className='capitalize'>
                                  {event.city}, {event.state}, {event.country}
                                </p>
                                <div className='mt-2'>
                                  {isFreeEvent(event.prices[0].price) ? (
                                    <div>Free</div>
                                  ) : (
                                    <div className='uppercase'>
                                      {`${event.prices[0].currency} ${event.prices[0].price}`}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </section>
                            <footer className='px-3 absolute bottom-3'>
                              <h3>{event.organization.name}</h3>
                            </footer>
                          </article>
                        </Link>
                      )}
                  </div>
                );
              })}
            </>
          ) : (
            <div className='fade-in'>No events</div>
          )}
        </div>

        <div className='text-center my-4'>
          <Link href='/events'>
            <a className='inline-block py-1 px-3 w-52 border-2 border-slate-300 hover:border-slate-500 hover:bg-slate-50 transition duration-200 ease-linear'>
              See more
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;

Home.getLayout = (page: any) => {
  return (
    <>
      <ProtectedRoute role='public'>
        <Header />
        {page}
        <Footer />
      </ProtectedRoute>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  events: EventList['events'];
}> = async (ctx) => {
  try {
    const events = await eventService.getAllEvents();
    return {
      props: {
        events: events.slice(0, 6)
      }
    };
  } catch (err: any) {
    console.log(err);
    return {
      props: {
        events: []
      }
    };
  }
};
