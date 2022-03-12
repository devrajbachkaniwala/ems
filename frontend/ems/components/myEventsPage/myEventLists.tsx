import { MyEvents } from '@/services/eventService/__generated__/MyEvents';
import { TMyEvent } from 'pages/organization/[orgId]/my-events';
import { FC } from 'react';
import MyEventListItem from './myEventListItem';

/* type TEvent = {
  id: number;
  name: string;
  date: Date;
  time: string;
  city: string;
  state: string;
  photos: {
    photo: string;
  }[];
  prices: {
    price: number;
  }[];
}; */

type TMyEventListProps = {
  myEvents: MyEvents['organization']['events'];
  deleteEventById: (eventId: string) => Promise<void>;
};

/* export const events: TEvent[] = [
  {
    id: 1,
    name: 'Surat Video Speed Dating',
    date: new Date('2022-03-11'),
    time: '3:00',
    city: 'surat',
    state: 'gujarat',
    photos: [
      {
        photo: '/images/event-pic-1.jpg'
      }
    ],
    prices: [
      {
        price: 199
      }
    ]
  },
  {
    id: 2,
    name: 'How To Work From Home - Webinar Talk',
    date: new Date('2022-02-27'),
    time: '2:00',
    city: 'surat',
    state: 'gujarat',
    photos: [
      {
        photo: '/images/event-pic-2.jpg'
      }
    ],
    prices: [
      {
        price: 499
      }
    ]
  },
  {
    id: 3,
    name: 'How To Improve Your Focus and Limit Distractions',
    date: new Date('2022-02-23'),
    time: '11:30',
    city: 'surat',
    state: 'gujarat',
    photos: [
      {
        photo: '/images/event-pic-3.jpg'
      }
    ],
    prices: [
      {
        price: 399
      }
    ]
  }
]; */

const MyEventList: FC<TMyEventListProps> = ({ myEvents, deleteEventById }) => {
  return (
    <div className='w-4/5 mx-auto text-slate-700 flex flex-col justify-center items-center'>
      {/* Event Lists container */}
      <div className='my-4'>
        {myEvents?.length &&
          myEvents.map((myEvent, index) => (
            <MyEventListItem
              key={index}
              myEvent={myEvent}
              deleteEventById={deleteEventById}
            />
          ))}
      </div>
    </div>
  );
};

export default MyEventList;
