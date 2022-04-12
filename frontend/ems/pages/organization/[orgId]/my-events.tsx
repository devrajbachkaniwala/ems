import authService from '@/services/authService';
import eventService from '@/services/eventService';
import { MyEvents } from '@/services/eventService/__generated__/MyEvents';
import { store } from 'app/stores';
import Footer from 'components/footer';
import Header from 'components/header';
import LoadingSpinner from 'components/loadingSpinner';
import MyEventList from 'components/myEventsPage/myEventLists';
import { ProtectedRoute } from 'components/protectedRoute';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TPageLayout } from 'types/pageLayout';

export type TMyEvent = {
  id: number;
  name: string;
  description: string;
  events: {
    id: number;
    name: string;
    city: string;
    state: string;
    photos: {
      id: number;
      photo: string;
    }[];
    prices: {
      id: number;
      price: number;
      currency: string;
    }[];
    timings: {
      id: number;
      date: Date;
      startTime: string;
      endTime: string;
    }[];
  }[];
};

export const myEventsData: TMyEvent = {
  id: 1,
  name: 'test',
  description: 'test description',
  events: [
    {
      id: 1,
      name: 'Surat Video Speed Dating',
      city: 'surat',
      state: 'gujarat',
      timings: [
        {
          id: 1001,
          date: new Date('2022-03-11'),
          startTime: '15:00',
          endTime: '18:00'
        }
      ],
      photos: [
        {
          id: 2001,
          photo: '/images/event-pic-1.jpg'
        }
      ],
      prices: [
        {
          id: 3001,
          price: 199,
          currency: 'INR'
        }
      ]
    },
    {
      id: 2,
      name: 'How To Work From Home - Webinar Talk',
      city: 'surat',
      state: 'gujarat',
      timings: [
        {
          id: 1002,
          date: new Date('2022-02-27'),
          startTime: '11:00',
          endTime: '16:00'
        }
      ],
      photos: [
        {
          id: 2002,
          photo: '/images/event-pic-2.jpg'
        }
      ],
      prices: [
        {
          id: 3002,
          price: 499,
          currency: 'INR'
        }
      ]
    },
    {
      id: 3,
      name: 'How To Improve Your Focus and Limit Distractions',
      city: 'surat',
      state: 'gujarat',
      timings: [
        {
          id: 1003,
          date: new Date('2022-02-23'),
          startTime: '11:30',
          endTime: '19:00'
        },
        {
          id: 1004,
          date: new Date('2022-02-23'),
          startTime: '11:30',
          endTime: '19:00'
        }
      ],
      photos: [
        {
          id: 2003,
          photo: '/images/event-pic-3.jpg'
        }
      ],
      prices: [
        {
          id: 3003,
          price: 399,
          currency: 'INR'
        }
      ]
    }
  ]
};

const MyEventsPage: NextPage & TPageLayout = () => {
  const [myEvents, setMyEvents] = useState<
    MyEvents['organization']['events'] | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    /* authService.getUserProfile().then((user) => {
      if (user.organization?.id) {
        eventService
          .orgEvents()
          .then((events) => {
            console.log(events);
            setMyEvents(events);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        router.replace('/organization/add');
      }
    }); */
    eventService
      .orgEvents()
      .then((events) => {
        console.log(events);
        setMyEvents(events);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!myEvents && isLoading) {
    return (
      <div className='min-h-[80vh] overflow-auto flex justify-center fade-in-out'>
        <LoadingSpinner />
      </div>
    );
  }

  const deleteEventById = async (eventId: string) => {
    try {
      const res = await eventService.deleteEventById(eventId);
      if (res) {
        setMyEvents((prevState) => {
          return prevState?.filter((event) => {
            return event.id !== eventId;
          });
        });
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className='min-h-[80vh] overflow-auto'>
      <article className=' text-slate-700'>
        <h2 className='text-center text-xl font-bold'>My Events</h2>
        <section>
          {myEvents?.length ? (
            <MyEventList
              myEvents={myEvents}
              deleteEventById={deleteEventById}
            />
          ) : (
            <div className='text-center mt-2'>No Events</div>
          )}
        </section>
      </article>
    </div>
  );
};

export default MyEventsPage;

MyEventsPage.getLayout = (page: any) => {
  return (
    <>
      <ProtectedRoute role='organization'>
        <Header />
        {page}
        <Footer />
      </ProtectedRoute>
    </>
  );
};
