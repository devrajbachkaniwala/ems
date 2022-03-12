import Link from 'next/link';
import { TEvent } from 'pages/events';
import { TMyBooking } from 'pages/my-bookings';
import { TMyEvent } from 'pages/organization/[orgId]/my-events';
import { FC } from 'react';
import { dateFormatter } from 'utils/dateFormatter';

type TEventListItemProps = {
  booking?: TMyBooking;
  myEvent?: TEvent;
  event?: TEvent;
};

const EventListItem: FC<TEventListItemProps> = (props) => {
  const bookedEvent = props?.booking;
  const event = props?.event;
  const myEvent = props?.myEvent;

  let curEvent: any = {};

  if (bookedEvent) {
    curEvent['name'] = bookedEvent.event.name;
    curEvent['date'] = bookedEvent.bookingItem.timing.date;
    curEvent['city'] = bookedEvent.event.city;
    curEvent['state'] = bookedEvent.event.state;
    curEvent['price'] = bookedEvent.bookingItem.price.price;
    curEvent['currency'] = bookedEvent.bookingItem.price.currency;
    curEvent['photo'] = bookedEvent.event.photos[0];
  } else if (myEvent) {
    curEvent['name'] = myEvent.name;
    curEvent['date'] = myEvent.timings[0].date;
    curEvent['city'] = myEvent.city;
    curEvent['state'] = myEvent.state;
    curEvent['price'] = myEvent.prices[0].price;
    curEvent['currency'] = myEvent.prices[0].currency;
    curEvent['photo'] = myEvent.photos[0].photo;
  } else if (event) {
    curEvent['name'] = event.name;
    curEvent['date'] = event.timings[0].date;
    curEvent['city'] = event.city;
    curEvent['state'] = event.state;
    curEvent['price'] = event.prices[0].price;
    curEvent['currency'] = event.prices[0].currency;
    curEvent['photo'] = event.photos[0].photo;
  }

  return (
    /* Event item container */
    //<Link href={`/events/${event.id}`} passHref>
    <article className='flex flex-col-reverse md:flex-row my-6 max-w-[720px] bg-slate-100 rounded-md overflow-hidden hover:shadow-lg hover:cursor-pointer transition duration-200 ease-linear'>
      <div className='w-full md:w-[60%] px-4 py-3'>
        <h2 className='text-lg text-slate-800 font-bold'>
          {curEvent.name} sport
        </h2>
        <p className='text-orange-600 font-bold my-2'>
          {/* dateFormatter(curEvent.date) */} time
        </p>
        <p className='text-slate-600 text-sm'>
          {`${curEvent.city}, ${curEvent.state}`}city, state
        </p>
        <p className='text-slate-600 text-sm'>
          {curEvent.currency} {curEvent.price}
          INR 12
        </p>
      </div>
      <div className='w-full md:w-[40%]'>
        <img
          src={curEvent.photo}
          alt={curEvent.name}
          className='h-[160px] w-full object-cover'
        />
      </div>
    </article>
    //</Link>
  );
};

export default EventListItem;
