/* eslint-disable @next/next/no-img-element */
import {
  BookingDetail,
  BookingDetail_bookingById
} from '@/services/bookingService/__generated__/BookingDetail';
import { EventReview } from 'components/eventReview';
import Modal from 'components/modal';
import OrganizationContactPopUp from 'components/organizationContactPopUp';
import { MonthEnum } from 'enums/monthEnum';
import { WeekEnum } from 'enums/weekEnum';
import Link from 'next/link';
import { TMyBooking } from 'pages/my-bookings';
import { FC, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { dateFormatter } from 'utils/dateFormatter';
import { timeFormatter } from 'utils/timeFormatter';

type TBookedEventDetail = {
  booking: BookingDetail['bookingById'];
  cancelBooking: (bookingId: string) => Promise<void>;
};

const BookedEventDetail: FC<TBookedEventDetail> = ({
  booking,
  cancelBooking
}) => {
  const [showOrganizationPopUp, setShowOrganizationPopUp] =
    useState<boolean>(false);

  if (!booking) {
    return <div> No booking</div>;
  }
  const { event, bookingItem } = booking;
  const { qty, status, organization, price, timing } = bookingItem;

  return (
    <>
      {/* Main container */}
      <div className='shadow-lg text-slate-700 h-fit w-3/4 mx-auto rounded-lg overflow-hidden'>
        {/* column container */}
        <div className='flex flex-col w-full'>
          {/* 1st row container */}
          <div className='flex flex-col lg:flex-row flex-wrap'>
            {/* Left side Img container */}
            <div className='w-full lg:w-4/6 h-3/4 object-cover overflow-hidden'>
              {event.photos?.length ? (
                <img
                  src={event.photos[0].photo}
                  alt={event.name}
                  className='object-cover w-full h-[400px]'
                />
              ) : (
                <div>No image</div>
              )}
            </div>
            {/* Right side Event name container */}
            <div className='w-full lg:w-2/6 bg-gray-100'>
              <section className='p-5 ml-2 h-full text-slate-700 '>
                <div className='inline-block leading-4 text-center'>
                  <p className='font-bold uppercase'>
                    {MonthEnum[new Date(timing.date).getMonth()]}
                  </p>
                  <p className='font-medium'>
                    {new Date(timing.date).getDate()}
                  </p>
                </div>

                <div className='mt-5'>
                  <h2 className='text-xl font-bold text-slate-800'>
                    {event.name}
                  </h2>
                  <p className='mt-4 text-slate-600 font-medium'>
                    By {organization.name}
                  </p>
                </div>

                <div className='mt-5 text-slate-600 text-sm'>
                  <p className='capitalize'>Status {bookingItem.status}</p>
                  <p>
                    Booked {qty} of price {price.currency.toUpperCase()}{' '}
                    {price.price}
                  </p>
                  <p className='font-semibold'>
                    Paid {price.currency.toUpperCase()} {price.price * qty}
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* 2nd row  Register button container */}
          <div className='w-full lg:text-right border-b-2 py-3'>
            <div className='inline-block w-full lg:w-2/6 text-center'>
              <button
                type='button'
                disabled={bookingItem.status === 'cancel'}
                className={`inline-block w-[90%] rounded-md mx-2 px-4 text-center py-1 text-red-600 border-2 border-red-600 transition duration-200 ease-linear ${
                  bookingItem.status === 'cancel'
                    ? 'cursor-not-allowed'
                    : 'hover:text-white hover:bg-red-600'
                }`}
                onClick={() => cancelBooking(booking.id)}
              >
                {bookingItem.status === 'cancel'
                  ? 'Canceled'
                  : 'Cancel booking'}
              </button>
            </div>
          </div>

          {/* 3rd row container */}
          <div className='h-fit flex flex-col lg:flex-row flex-wrap mt-9'>
            {/* Left side Description container */}
            <div className='w-full lg:w-4/6'>
              <section className='mx-4 pt-5 px-8'>
                <h2 className='text-slate-900 font-semibold mb-2'>
                  Description
                </h2>
                <p>{event.description}</p>
              </section>
            </div>
            {/* Right side Date & time and location container */}
            <div className='w-full lg:w-2/6'>
              <div className='mx-4 px-8 lg:mx-2 pt-5 lg:px-5 pb-5'>
                <section>
                  <h2 className='text-slate-900 font-semibold mb-2'>
                    Date and Time
                  </h2>
                  <div className='leading-5 text-slate-900'>
                    <p>
                      {/* Fri, March 11, 2022 */}{' '}
                      {dateFormatter(new Date(timing.date))}
                    </p>
                    <p>
                      {/* 8:00 PM – 9:00 PM IST */}{' '}
                      {timeFormatter(timing.startTime)} -{' '}
                      {timeFormatter(timing.endTime)}
                    </p>
                  </div>
                </section>

                <section className='text-slate-900 mt-4'>
                  <h2 className='font-semibold'>Location</h2>
                  <div className='leading-5 mt-2 capitalize'>
                    <p>{event.venue}</p>
                    <p>
                      {event.city}, {event.state}
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* 4th row Tags container */}
          <div className='w-full px-12 py-5 border-b-2'>
            <h2 className='text-slate-900 font-semibold mb-2'>Category</h2>
            <p className='inline-block px-2 border-2 border-slate-400 rounded-2xl align-middle capitalize'>
              {event.category}
            </p>
          </div>

          {/* 5th row Event Host container */}
          <div className='w-full my-12 flex justify-center items-start'>
            <section>
              <figure className='flex justify-center items-start'>
                <img
                  src={organization.photo}
                  alt={organization.name}
                  className='w-[120px] h-[120px] rounded-full object-cover'
                />
              </figure>
              <h2 className='mt-2 text-slate-900 text-center'>
                {organization.name}
              </h2>
              <div className='text-center mt-1'>
                <button
                  className='inline-block px-2 py-1 rounded-md border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition duration-200 ease-linear'
                  onClick={() => setShowOrganizationPopUp(true)}
                >
                  Contact
                </button>
              </div>
            </section>
          </div>

          <div>
            <EventReview eventId={event.id} />
          </div>
        </div>
      </div>

      {showOrganizationPopUp && (
        <OrganizationContactPopUp
          orgDetail={organization}
          closeOrganizationContactPopUp={() => setShowOrganizationPopUp(false)}
        />
      )}
    </>
  );
};

export default BookedEventDetail;
