/* eslint-disable @next/next/no-img-element */
import authService from '@/services/authService';
import bookingService from '@/services/bookingService';
import { EventDetail } from '@/services/eventService/__generated__/EventDetail';
import { store } from 'app/stores';
import Modal from 'components/modal';
import OrganizationContactPopUp from 'components/organizationContactPopUp';
import { MonthEnum } from 'enums/monthEnum';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TEventData } from 'pages/events/[eventId]';
import { FC, MouseEventHandler, useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { dateFormatter } from 'utils/dateFormatter';
import { isFreeEvent } from 'utils/isFreeEvent';
import { timeFormatter } from 'utils/timeFormatter';

type TEventDetailProps = {
  event: EventDetail['eventById'];
};

const EventDetail: FC<TEventDetailProps> = ({ event }) => {
  const organization = event?.organization;
  const prices = event?.prices;
  const timings = event?.timings;
  const photos = event?.photos;

  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [showOrganizationPopUp, setShowOrganizationPopUp] =
    useState<boolean>(false);

  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [selectedTiming, setSelectedTiming] = useState<number>(0);
  const [selectedQty, setSelectedQty] = useState<number>(1);

  const optPriceRef = useRef<HTMLSelectElement | null>(null);
  const router = useRouter();

  const registerBooking: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      if (event && organization && prices?.length && timings?.length) {
        //const user = await authService.getUserProfile();

        if (!store.auth.user?.id) {
          router.push('/login');
          return;
        }

        const res = await bookingService.bookEvent({
          eventId: event?.id,
          orgId: organization?.id,
          priceId: prices[selectedPrice]['id'],
          timingId: timings[selectedTiming]['id'],
          qty: selectedQty
        });
        if (res?.id) {
          console.log('success');
          router.push('/my-bookings');
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      {event &&
        organization &&
        prices?.length &&
        timings?.length &&
        photos?.length && (
          <>
            {/* Main container */}
            <div className='shadow-lg text-slate-700 h-fit w-3/4 mx-auto rounded-lg overflow-hidden'>
              {/* column container */}
              <div className='flex flex-col w-full'>
                {/* 1st row container */}
                <div className='flex flex-col lg:flex-row flex-wrap'>
                  {/* Left side Img container */}
                  <div className='w-full lg:w-4/6 h-3/4 object-cover overflow-hidden'>
                    <img src={photos[0].photo} alt={event.name} />
                  </div>
                  {/* Right side Event name container */}
                  <div className='w-full lg:w-2/6 bg-gray-100'>
                    <section className='p-5 ml-2 h-full text-slate-700 '>
                      <div className='inline-block leading-4 text-center'>
                        <p className='font-bold uppercase'>
                          {
                            MonthEnum[
                              new Date(timings[selectedTiming].date).getMonth()
                            ]
                          }
                        </p>
                        <p className='font-medium'>
                          {new Date(timings[selectedTiming].date).getDate()}
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

                      <div className='mt-5 text-slate-800'>
                        {isFreeEvent(prices[selectedPrice].price)
                          ? 'Free'
                          : `${prices[selectedPrice].currency} ${prices[selectedPrice].price}`}
                      </div>
                    </section>
                  </div>
                </div>

                {/* 2nd row  Register button container */}
                <div className='w-full lg:text-right border-b-2 py-3'>
                  <div className='inline-block w-full lg:w-2/6 text-center'>
                    <button
                      className='inline-block w-[90%] rounded-md mx-2 px-4 text-center py-1 bg-green-700 text-white hover:bg-green-600 transition duration-200 ease-linear'
                      onClick={() => setShowRegisterModal(true)}
                    >
                      Register
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
                            {dateFormatter(
                              new Date(timings[selectedTiming].date)
                            )}
                          </p>
                          <p>
                            {`${timeFormatter(
                              timings[selectedTiming].startTime
                            )} - ${timeFormatter(
                              timings[selectedTiming].endTime
                            )}`}
                          </p>
                        </div>
                      </section>
                      <div className='my-10'>
                        <select
                          name='selectDate'
                          className='border-2 border-slate-300 bg-slate-50 py-3 px-2 w-full hover:cursor-pointer focus:border-blue-600 text-slate-900'
                          onChange={(e) => {
                            setSelectedTiming(+e.target.value);
                          }}
                          defaultValue='-1'
                        >
                          <option value='-1'>Select a different date</option>
                          {timings.map((timing, idx) => (
                            <option key={timing.id} value={idx}>
                              {dateFormatter(new Date(timing.date))}{' '}
                              {`${timeFormatter(
                                timing.startTime
                              )} - ${timeFormatter(timing.endTime)}`}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='my-10'>
                        <select
                          name='selectPrice'
                          className='border-2 border-slate-300 bg-slate-50 py-3 px-2 w-full hover:cursor-pointer focus:border-blue-600 text-slate-900'
                          onChange={(e) => {
                            setSelectedPrice(+e.target.value);
                          }}
                          ref={optPriceRef}
                          defaultValue='-1'
                        >
                          <option value='-1'>
                            Select a different price plan
                          </option>
                          {prices.map((price, idx) => (
                            <option key={price.id} value={idx}>
                              {isFreeEvent(price.price)
                                ? 'Free'
                                : `${price.currency} ${price.price}`}
                            </option>
                          ))}
                        </select>
                      </div>

                      <section className='text-slate-900'>
                        <h2 className='font-semibold'>Location</h2>
                        <div className='leading-5 mt-2'>
                          <p>{event.venue}</p>
                          <p>
                            {event.city}, {event.state}
                          </p>
                          <p>{event.country}</p>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>

                {/* 4th row Tags container */}
                <div className='w-full px-12 py-5 border-b-2'>
                  <h2 className='text-slate-900 font-semibold mb-2'>Tags</h2>
                  <p className='inline-block px-2 border-2 border-slate-400 rounded-2xl'>
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
              </div>
            </div>
            {showRegisterModal && (
              <Modal>
                {/* Modal container */}
                <div className='fixed bg-black bg-opacity-70 z-[1000] top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center'>
                  <div className='grid md:grid-cols-[70%_30%] overflow-auto md:overflow-hidden lg:w-4/5 xl:w-3/5 h-4/5 mx-10 bg-slate-50 rounded-lg  text-slate-700 relative'>
                    {/* Left side modal container */}
                    <div className=''>
                      <section className=' px-4 py-2 text-center border-b-2'>
                        <h2 className='text-xl font-bold'>{event.name}</h2>
                        <p className='text-sm font-semibold'>
                          {dateFormatter(
                            new Date(timings[selectedTiming].date)
                          )}{' '}
                          {timeFormatter(timings[selectedTiming].startTime)} -{' '}
                          {timeFormatter(timings[selectedTiming].endTime)}
                        </p>
                      </section>

                      <section className='my-10 mx-7'>
                        <h3 className='mb-1'>Select a different price plan</h3>
                        <select
                          name='selectPrice'
                          className='border-2 border-slate-300 bg-slate-50 p-1 w-52 hover:cursor-pointer focus:border-blue-600 text-slate-900'
                          onChange={(e) => {
                            setSelectedPrice(+e.target.value);
                            if (optPriceRef.current) {
                              optPriceRef.current.value = e.target.value;
                            }
                          }}
                          value={selectedPrice}
                        >
                          {prices.map((price, idx) => (
                            <option key={price.id} value={idx}>
                              {isFreeEvent(price.price)
                                ? 'Free'
                                : `${price.currency} ${price.price}`}
                            </option>
                          ))}
                        </select>
                      </section>

                      <section className='my-10 mx-7'>
                        <h3 className='mb-1'>Select quantity</h3>
                        <select
                          name='selectQty'
                          className='border-2 border-slate-300 bg-slate-50 p-1 w-52 hover:cursor-pointer focus:border-blue-600 text-slate-900'
                          onChange={(e) => {
                            setSelectedQty(+e.target.value);
                          }}
                          value={selectedQty}
                        >
                          {'1,2,3,4,5,6,7,8,9,10'.split(',').map((item) => {
                            return (
                              <option key={item} value={+item}>
                                {+item}
                              </option>
                            );
                          })}
                        </select>
                      </section>
                    </div>

                    {/* Right side modal container */}
                    <div className='bg-slate-100'>
                      <section>
                        <img
                          src={photos[0].photo}
                          alt={event.name}
                          className='w-full h-auto object-cover'
                        />
                      </section>
                      <section className='my-5 mx-5'>
                        <h3 className='text-slate-900 mb-2'>Order summary</h3>
                        <div className='border-b-2 pb-2 mb-2'>
                          <div className='flex'>
                            <p className='flex-grow'>
                              {selectedQty} x price plan
                            </p>
                            <p>{prices[selectedPrice].price}</p>
                          </div>
                        </div>
                        <div className='flex'>
                          <p className='flex-grow'>Total</p>
                          <p>INR {prices[selectedPrice].price * selectedQty}</p>
                        </div>
                      </section>
                      <div className='flex flex-col justify-center items-center'>
                        <button
                          type='button'
                          className='my-2 px-2 py-1 rounded-md bg-green-500 hover:bg-green-700 hover:text-slate-50'
                          onClick={registerBooking}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                    <MdClose
                      onClick={() => setShowRegisterModal(false)}
                      className='absolute text-lg text-slate-700 top-0 right-0 hover:cursor-pointer'
                    />
                  </div>
                </div>
              </Modal>
            )}

            {showOrganizationPopUp && (
              <OrganizationContactPopUp
                orgDetail={organization}
                closeOrganizationContactPopUp={() =>
                  setShowOrganizationPopUp(false)
                }
              />
            )}
          </>
        )}
    </>
  );
};

export default EventDetail;
