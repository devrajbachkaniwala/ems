import PriceForm from 'components/createEventPage/priceForm';
import { NextPage } from 'next';
import {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';
import { MdAdd, MdAddCircleOutline, MdImage } from 'react-icons/md';
import { HiOutlineMinusCircle } from 'react-icons/hi';
import { imageValidator } from 'utils/imageValidator';
import { FaTrashAlt } from 'react-icons/fa';
import eventService from '@/services/eventService';
import eventPriceService from '@/services/eventPriceService';
import eventTimingService from '@/services/eventTimingService';
import eventPhotoService from '@/services/eventPhotoService';
import {
  EventDetail,
  EventDetail_eventById,
  EventDetail_eventById_photos,
  EventDetail_eventById_prices,
  EventDetail_eventById_timings
} from '@/services/eventService/__generated__/EventDetail';
import { useRouter } from 'next/router';

/* type TPrice = {
  price: number;
  currency: string;
  maxLimit: number;
}; */
type TPrice = EventDetail_eventById_prices;

const initialPriceState: TPrice = {
  __typename: 'EventPrice',
  id: '',
  price: 0,
  currency: '',
  maxLimit: 0,
  sold: 0
};

type TTiming = EventDetail_eventById_timings;

const initialTimingState: TTiming = {
  __typename: 'EventTiming',
  id: '',
  date: '',
  startTime: '',
  endTime: ''
};

type TPhoto = EventDetail_eventById_photos;

const initialPhotoState: TPhoto = {
  __typename: 'EventPhoto',
  id: '',
  photo: ''
};

/* export type TEvent = {
  id?: string;
  name: string;
  description: string;
  city: string;
  state: string;
  country: string;
  venue: string;
  category: string;
  geoLatLng: string;
  photos: TPhoto[];
  prices: TPrice[];
  timings: TTiming[];
}; */

type TInitialEventState = EventDetail_eventById;

const initialEventState: TInitialEventState = {
  __typename: 'Event',
  id: '',
  name: '',
  description: '',
  city: '',
  state: '',
  country: '',
  venue: '',
  category: '',
  geoLatLng: '(102, 103)',
  photos: [],
  prices: [],
  timings: [],
  organization: {
    __typename: 'Organization',
    id: '',
    name: '',
    photo: '',
    description: '',
    email: '',
    contactNo: ''
  }
};

type TAddEditEventProps = {
  event?: EventDetail['eventById'];
};

const AddEditEvent: NextPage<TAddEditEventProps> = (props) => {
  const event = props?.event;
  const isAddMode = !event;
  const eventId = props.event?.id || '';
  const router = useRouter();

  const [priceForms, setPriceForms] = useState<TPrice[]>(
    event?.prices?.length ? event?.prices : [initialPriceState]
  );
  const [timingForms, setTimingForms] = useState<TTiming[]>(
    event?.timings?.length ? event?.timings : [initialTimingState]
  );
  const [photoForms, setPhotoForms] = useState<TPhoto[]>(
    event?.photos?.length ? event?.photos : [initialPhotoState]
  );
  const [eventForm, setEventForm] = useState<TInitialEventState>(
    event ? event : initialEventState
  );

  /* useEffect(() => {
    console.log(eventForm);
  }, [eventForm]); */

  const [isFieldDisabled, setIsFieldDisabled] = useState<boolean>(!!event);

  const handlePriceChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setPriceForms((prevState) => {
      return prevState.map((price, idx) => {
        if (idx === index) {
          return {
            ...price,
            [e.target.name]: e.target.value
          };
        }
        return price;
      });
    });
  };

  const handleTimingChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setTimingForms((prevState) => {
      return prevState.map((timing, idx) => {
        if (idx === index) {
          return {
            ...timing,
            [e.target.name]: e.target.value
          };
        }
        return timing;
      });
    });
  };

  const setEventPhoto = (imgFile: File, index: number) => {
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = () => {
      setPhotoForms((prevState) => {
        return prevState.map((photo, idx) => {
          if (idx === index) {
            return {
              ...photo,
              photo: reader.result as string
            };
          }
          return photo;
        });
      });
    };
  };

  const handlePhotoChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    try {
      setPhotoForms((prevState) => {
        return prevState.map((photo, idx) => {
          if (idx === index) {
            return {
              ...photo,
              photo: ''
            };
          }
          return photo;
        });
      });
      if (!e.target.files?.length) {
        /* setIsSubmit(true);
        setFormErrors({
          ...formErrors,
          userPhoto: null,
        }); */
        return;
      }

      const file: File = e.target.files[0];

      const isValidImg: boolean = imageValidator(file);

      if (isValidImg) {
        /* setFormErrors({
          ...formErrors,
          userPhoto: null,
        }); */
        //setIsSubmit(true);
        setEventPhoto(file, index);
      }
    } catch (err: any) {
      /* setFormErrors({
        ...formErrors,
        userPhoto: err.message,
      });
      setIsSubmit(false); */
      console.log(err);
    }
  };

  const handleEventFormValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEventForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(eventForm);

    if (isAddMode) {
      try {
        const {
          __typename,
          id,
          photos,
          timings,
          prices,
          organization,
          ...restEvent
        } = eventForm;
        const eventRes = await eventService.createEvent(restEvent);

        priceForms.map(async (p) => {
          try {
            const { __typename, id, sold, ...restPrice } = p;
            const priceRes = await eventPriceService.addEventPriceByEventId(
              eventRes.id,
              {
                ...restPrice,
                price: +restPrice.price,
                maxLimit: +restPrice.maxLimit
              }
            );

            await new Promise((res) => setTimeout(res, 100));
          } catch (err: any) {
            throw err;
          }
        });

        timingForms.map(async (timing) => {
          try {
            const { __typename, id, ...restTiming } = timing;
            const timingRes = await eventTimingService.addEventTimingByEventId(
              eventRes.id,
              restTiming
            );
          } catch (err: any) {
            throw err;
          }
        });

        photoForms.map(async (p) => {
          try {
            const { __typename, id, photo } = p;
            const photoRes = await eventPhotoService.addEventPhotoByEventId(
              eventRes.id,
              photo
            );
          } catch (err: any) {
            throw err;
          }
        });

        if (eventRes.id) {
          router.push(`/events/${eventRes.id}`);
        }
      } catch (err: any) {
        console.log(JSON.stringify(err));
        console.log(err.message);
      }
    } else {
      setIsFieldDisabled(true);
      try {
        const {
          id,
          __typename,
          photos,
          timings,
          prices,
          organization,
          ...restEvent
        } = eventForm;
        const eventRes = await eventService.updateEventById(eventId, restEvent);
        priceForms.map(async (p) => {
          try {
            const { __typename, id, sold, ...restPrice } = p;
            console.log(`priceId: ${id}`);
            if (!id) {
              const priceRes = await eventPriceService.addEventPriceByEventId(
                eventId,
                {
                  ...restPrice,
                  price: +restPrice.price,
                  maxLimit: +restPrice.maxLimit
                }
              );
            } else {
              const priceRes = await eventPriceService.updateEventPriceById(
                eventId,
                id,
                {
                  ...restPrice,
                  price: +restPrice.price,
                  maxLimit: +restPrice.maxLimit
                }
              );
            }

            await new Promise((res) => setTimeout(res, 100));
          } catch (err: any) {
            throw err;
          }
        });

        timingForms.map(async (timing) => {
          try {
            const { __typename, id, ...restTiming } = timing;
            if (!id) {
              const timingRes =
                await eventTimingService.addEventTimingByEventId(
                  eventId,
                  restTiming
                );
            } else {
              const timingRes = await eventTimingService.updateEventTimingById(
                eventId,
                id,
                restTiming
              );
            }
          } catch (err: any) {
            throw err;
          }
        });

        photoForms.map(async (p) => {
          try {
            const { __typename, id, photo } = p;
            if (!id) {
              const photoRes = await eventPhotoService.addEventPhotoByEventId(
                eventId,
                photo
              );
            } else {
              const photoRes = await eventPhotoService.updateEventPhotoById(
                eventId,
                id,
                photo
              );
            }
          } catch (err: any) {
            throw err;
          }
        });
      } catch (err: any) {
        console.log(err);
        console.log(JSON.stringify(err));
      }
    }
  };

  const removePriceById = async (index: number, priceId?: string) => {
    if (priceId && !isAddMode) {
      const res = await eventPriceService.removeEventPriceById(
        eventId,
        priceId
      );
      if (!res) return;
      setPriceForms((prevState) => {
        return prevState.filter((price, idx) => {
          return idx !== index;
        });
      });
    } else if (isAddMode) {
      setPriceForms((prevState) => {
        return prevState.filter((price, idx) => {
          return idx !== index;
        });
      });
    }
  };

  const removeTimingById = async (index: number, timingId?: string) => {
    if (timingId && !isAddMode) {
      const res = await eventTimingService.removeEventTimingById(
        eventId,
        timingId
      );
      if (!res) return;
      setTimingForms((prevState) => {
        return prevState.filter((timing, idx) => {
          return idx !== index;
        });
      });
    } else if (isAddMode) {
      setTimingForms((prevState) => {
        return prevState.filter((timing, idx) => {
          return idx !== index;
        });
      });
    }
  };

  const removePhotoById = async (index: number, photoId?: string) => {
    if (photoId && !isAddMode) {
      const res = await eventPhotoService.removeEventPhotoById(
        eventId,
        photoId
      );
      if (!res) return;
      setPhotoForms((prevState) => {
        return prevState.filter((photo, idx) => {
          return idx !== index;
        });
      });
    } else if (isAddMode) {
      setPhotoForms((prevState) => {
        return prevState.filter((photo, idx) => {
          return idx !== index;
        });
      });
    }
  };

  const deleteEvent: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const res = await eventService.deleteEventById(eventId);
      if (res) {
        router.push('/events/add');
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className='min-h-[80vh]  text-slate-700'>
      <div className='w-full md:w-4/5 h-full mb-4 mx-auto'>
        <h2 className='text-center text-2xl font-semibold my-5'>
          {isAddMode ? 'Create an event' : 'Update an event'}
        </h2>
        <div className='mx-2'>
          <form name='event' id='eventForm' onSubmit={handleSubmit}>
            <div className='w-[80%] md:w-[50%] flex justify-between items-center mb-4'>
              <label htmlFor='name' className='w-[40%] px-2 py-1'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={eventForm.name}
                placeholder='Enter event name'
                className={`w-[60%] px-2 py-1 border-2 border-slate-400 rounded-md transition duration-200 ease-linear ${
                  isFieldDisabled
                    ? 'cursor-not-allowed'
                    : 'hover:border-slate-700 focus:outline-none focus:border-slate-700'
                }`}
                onChange={handleEventFormValueChange}
                disabled={isFieldDisabled}
              />
            </div>
            <div className='w-[80%] md:w-[50%] flex justify-between items-center mb-4'>
              <label htmlFor='description' className='w-[40%] px-2 py-1'>
                Description
              </label>
              <textarea
                id='description'
                name='description'
                value={eventForm.description}
                placeholder='Enter event description'
                onChange={handleEventFormValueChange}
                className={`w-[60%] px-2 py-1 border-2 border-slate-400 rounded-md transition duration-200 ease-linear ${
                  isFieldDisabled
                    ? 'cursor-not-allowed'
                    : 'hover:border-slate-700 focus:outline-none focus:border-slate-700'
                }`}
                disabled={isFieldDisabled}
              />
            </div>
            <div className='w-[80%] md:w-[50%] flex justify-between items-center mb-4'>
              <label htmlFor='city' className='w-[40%] px-2 py-1'>
                City
              </label>
              <input
                type='text'
                id='city'
                name='city'
                value={eventForm.city}
                placeholder='Enter event city'
                onChange={handleEventFormValueChange}
                className={`w-[60%] px-2 py-1 border-2 border-slate-400 rounded-md transition duration-200 ease-linear ${
                  isFieldDisabled
                    ? 'cursor-not-allowed'
                    : 'hover:border-slate-700 focus:outline-none focus:border-slate-700'
                }`}
                disabled={isFieldDisabled}
              />
            </div>
            <div className='w-[80%] md:w-[50%] flex justify-between items-center mb-4'>
              <label htmlFor='state' className='w-[40%] px-2 py-1'>
                State
              </label>
              <input
                type='text'
                id='state'
                name='state'
                value={eventForm.state}
                placeholder='Enter event state'
                onChange={handleEventFormValueChange}
                className={`w-[60%] px-2 py-1 border-2 border-slate-400 rounded-md transition duration-200 ease-linear ${
                  isFieldDisabled
                    ? 'cursor-not-allowed'
                    : 'hover:border-slate-700 focus:outline-none focus:border-slate-700'
                }`}
                disabled={isFieldDisabled}
              />
            </div>
            <div className='w-[80%] md:w-[50%] flex justify-between items-center mb-4'>
              <label htmlFor='country' className='w-[40%] px-2 py-1'>
                Country
              </label>
              <input
                type='text'
                id='country'
                name='country'
                value={eventForm.country}
                placeholder='Enter event country'
                onChange={handleEventFormValueChange}
                className={`w-[60%] px-2 py-1 border-2 border-slate-400 rounded-md transition duration-200 ease-linear ${
                  isFieldDisabled
                    ? 'cursor-not-allowed'
                    : 'hover:border-slate-700 focus:outline-none focus:border-slate-700'
                }`}
                disabled={isFieldDisabled}
              />
            </div>
            <div className='w-[80%] md:w-[50%] flex justify-between items-center mb-4'>
              <label htmlFor='venue' className='w-[40%] px-2 py-1'>
                Venue
              </label>
              <textarea
                id='venue'
                name='venue'
                value={eventForm.venue}
                placeholder='Enter event venue'
                onChange={handleEventFormValueChange}
                className={`w-[60%] px-2 py-1 border-2 border-slate-400 rounded-md transition duration-200 ease-linear ${
                  isFieldDisabled
                    ? 'cursor-not-allowed'
                    : 'hover:border-slate-700 focus:outline-none focus:border-slate-700'
                }`}
                disabled={isFieldDisabled}
              />
            </div>
            <div className='w-[80%] md:w-[50%] flex justify-between items-center mb-4'>
              <label htmlFor='category' className='w-[40%] px-2 py-1'>
                Category
              </label>
              <input
                type='text'
                id='category'
                name='category'
                value={eventForm.category}
                placeholder='Enter event category'
                onChange={handleEventFormValueChange}
                className={`w-[60%] px-2 py-1 border-2 border-slate-400 rounded-md transition duration-200 ease-linear ${
                  isFieldDisabled
                    ? 'cursor-not-allowed'
                    : 'hover:border-slate-700 focus:outline-none focus:border-slate-700'
                }`}
                disabled={isFieldDisabled}
              />
            </div>
          </form>

          <div className='flex '>
            <div className='flex w-[80%] md:w-[50%] flex-wrap'>
              {priceForms.map((price, index) => {
                return (
                  <form key={index} className='w-full'>
                    <h3 className='px-2 py-1 font-semibold flex items-center'>
                      <div>Price Plan {index + 1}</div>
                      {index ? (
                        <button
                          type='button'
                          className={`ml-2 text-red-600 ${
                            isFieldDisabled
                              ? 'cursor-not-allowed'
                              : 'hover:text-red-700'
                          }`}
                          onClick={() =>
                            isAddMode
                              ? removePriceById(index)
                              : removePriceById(index, price.id)
                          }
                          disabled={isFieldDisabled}
                        >
                          <HiOutlineMinusCircle className='text-3xl' />
                        </button>
                      ) : (
                        ''
                      )}
                    </h3>
                    <div className='w-full flex justify-between items-center mb-4'>
                      <label htmlFor='price' className='w-[40%] px-2 py-1'>
                        Price
                      </label>
                      <input
                        type='number'
                        name='price'
                        id='price'
                        value={price.price}
                        onChange={(event) => handlePriceChange(index, event)}
                        className={`w-[60%] px-2 py-1 border-2 border-slate-400 rounded-md transition duration-200 ease-linear ${
                          isFieldDisabled
                            ? 'cursor-not-allowed'
                            : 'hover:border-slate-700 focus:outline-none focus:border-slate-700'
                        }`}
                        disabled={isFieldDisabled}
                      />
                    </div>
                    <div className='w-full flex justify-between items-center mb-4'>
                      <label htmlFor='currency' className='w-[40%] px-2 py-1'>
                        Currency
                      </label>
                      <input
                        type='text'
                        name='currency'
                        id='currency'
                        value={price.currency}
                        onChange={(event) => handlePriceChange(index, event)}
                        className={`w-[60%] px-2 py-1 border-2 border-slate-400 rounded-md transition duration-200 ease-linear ${
                          isFieldDisabled
                            ? 'cursor-not-allowed'
                            : 'hover:border-slate-700 focus:outline-none focus:border-slate-700'
                        }`}
                        disabled={isFieldDisabled}
                      />
                    </div>
                    <div className='w-full flex justify-between items-center mb-4'>
                      <label htmlFor='maxLimit' className='w-[40%] px-2 py-1'>
                        Max Limit
                      </label>
                      <input
                        type='number'
                        name='maxLimit'
                        id='maxLimit'
                        value={price.maxLimit}
                        onChange={(event) => handlePriceChange(index, event)}
                        className={`w-[60%] px-2 py-1 border-2 border-slate-400 rounded-md transition duration-200 ease-linear ${
                          isFieldDisabled
                            ? 'cursor-not-allowed'
                            : 'hover:border-slate-700 focus:outline-none focus:border-slate-700'
                        }`}
                        disabled={isFieldDisabled}
                      />
                    </div>
                  </form>
                );
              })}
            </div>
            <div>
              <button
                type='button'
                onClick={() => {
                  setPriceForms((prevState) => [
                    ...prevState,
                    initialPriceState
                  ]);
                }}
                className={`ml-2 text-green-700  ${
                  isFieldDisabled
                    ? 'cursor-not-allowed'
                    : 'hover:text-green-800'
                }`}
                title='Add another price plan'
                disabled={isFieldDisabled}
              >
                <MdAddCircleOutline className='text-3xl' />
              </button>
            </div>
          </div>

          <div className='flex'>
            <div className='flex w-[80%] md:w-[50%] flex-wrap'>
              {timingForms.map((timing, index) => {
                return (
                  <form key={index} className='w-full'>
                    <h3 className='px-2 py-1 font-semibold flex items-center'>
                      <div>Timing {index + 1}</div>
                      {index ? (
                        <button
                          type='button'
                          className={`ml-2 text-red-600 ${
                            isFieldDisabled
                              ? 'cursor-not-allowed'
                              : 'hover:text-red-700'
                          }`}
                          onClick={() => {
                            isAddMode
                              ? removeTimingById(index)
                              : removeTimingById(index, timing.id);
                          }}
                          disabled={isFieldDisabled}
                        >
                          <HiOutlineMinusCircle className='text-3xl' />
                        </button>
                      ) : (
                        ''
                      )}
                    </h3>
                    <div className='w-full flex justify-between items-center mb-4'>
                      <label htmlFor='date' className='w-[40%] px-2 py-1'>
                        Date
                      </label>
                      <input
                        type='date'
                        id='date'
                        name='date'
                        value={timing.date}
                        onChange={(event) => handleTimingChange(index, event)}
                        className={`w-[60%] px-2 py-1 border-2 border-slate-400 rounded-md transition duration-200 ease-linear ${
                          isFieldDisabled
                            ? 'cursor-not-allowed'
                            : 'hover:border-slate-700 focus:outline-none focus:border-slate-700'
                        }`}
                        disabled={isFieldDisabled}
                      />
                    </div>
                    <div className='w-full flex justify-between items-center mb-4'>
                      <label htmlFor='startTime' className='w-[40%] px-2 py-1'>
                        Start Time
                      </label>
                      <input
                        type='time'
                        id='startTime'
                        name='startTime'
                        value={timing.startTime}
                        onChange={(event) => handleTimingChange(index, event)}
                        className={`w-[60%] px-2 py-1 border-2 border-slate-400 rounded-md transition duration-200 ease-linear ${
                          isFieldDisabled
                            ? 'cursor-not-allowed'
                            : 'hover:border-slate-700 focus:outline-none focus:border-slate-700'
                        }`}
                        disabled={isFieldDisabled}
                      />
                    </div>
                    <div className='w-full flex justify-between items-center mb-4'>
                      <label htmlFor='endTime' className='w-[40%] px-2 py-1'>
                        End Time
                      </label>
                      <input
                        type='time'
                        id='endTime'
                        name='endTime'
                        value={timing.endTime}
                        onChange={(event) => handleTimingChange(index, event)}
                        className={`w-[60%] px-2 py-1 border-2 border-slate-400 rounded-md transition duration-200 ease-linear ${
                          isFieldDisabled
                            ? 'cursor-not-allowed'
                            : 'hover:border-slate-700 focus:outline-none focus:border-slate-700'
                        }`}
                        disabled={isFieldDisabled}
                      />
                    </div>
                  </form>
                );
              })}
            </div>
            <div>
              <button
                type='button'
                onClick={() => {
                  setTimingForms((prevState) => [
                    ...prevState,
                    initialTimingState
                  ]);
                }}
                className={`ml-2 text-green-700 ${
                  isFieldDisabled
                    ? 'cursor-not-allowed'
                    : 'hover:text-green-800'
                }`}
                title='Add another Timing'
                disabled={isFieldDisabled}
              >
                <MdAddCircleOutline className='text-3xl' />
              </button>
            </div>
          </div>

          <div className='flex'>
            <div className='flex w-[80%] md:w-[50%] flex-wrap'>
              {photoForms.map((photo, index) => {
                return (
                  <form key={index} className='w-full'>
                    <h3 className='px-2 py-1 font-semibold flex items-center'>
                      <div>Photo {index + 1}</div>
                      {index ? (
                        <button
                          type='button'
                          className={`ml-2 text-red-600 ${
                            isFieldDisabled
                              ? 'cursor-not-allowed'
                              : 'hover:text-red-700'
                          }`}
                          onClick={() => {
                            isAddMode
                              ? removePhotoById(index)
                              : removePhotoById(index, photo.id);
                          }}
                          disabled={isFieldDisabled}
                        >
                          <HiOutlineMinusCircle className='text-3xl' />
                        </button>
                      ) : (
                        ''
                      )}
                    </h3>
                    <div className='h-[240px] w-full mb-4 bg-slate-200 relative'>
                      {photo.photo ? (
                        <img
                          src={photo.photo}
                          alt='eventPhoto'
                          className='h-[240px] w-full object-cover'
                        />
                      ) : (
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                          <div className='flex justify-center items-center'>
                            <MdImage className='text-5xl' />
                            <MdAdd className='text-5xl -ml-3 mb-8' />
                          </div>
                        </div>
                      )}

                      <input
                        type='file'
                        name='eventPhoto'
                        onChange={(event) => handlePhotoChange(index, event)}
                        className={`opacity-0 h-[240px] w-full absolute top-0 right-0 bottom-0 left-0 ${
                          isFieldDisabled
                            ? 'cursor-not-allowed'
                            : 'hover:cursor-pointer'
                        }`}
                        disabled={isFieldDisabled}
                      />
                    </div>
                  </form>
                );
              })}
            </div>

            <div>
              <button
                type='button'
                onClick={() => {
                  setPhotoForms((prevState) => [
                    ...prevState,
                    initialPhotoState
                  ]);
                }}
                className={`ml-2 text-green-700 ${
                  isFieldDisabled
                    ? 'cursor-not-allowed'
                    : 'hover:text-green-800'
                }`}
                title='Add another Photo'
                disabled={isFieldDisabled}
              >
                <MdAddCircleOutline className='text-3xl' />
              </button>
            </div>
          </div>

          <div className='w-[80%] md:w-[50%] flex justify-center'>
            {isAddMode ? (
              <button
                type='submit'
                className='px-2 py-1 w-full text-blue-600 border-2 rounded-md border-blue-600 hover:text-white hover:bg-blue-600 transition duration-200 ease-linear'
                form='eventForm'
              >
                Create
              </button>
            ) : (
              <>
                <button
                  type='button'
                  className={`px-2 py-1 mr-2 w-[50%] text-blue-600 border-2 rounded-md border-blue-600 transition duration-200 ease-linear ${
                    !isFieldDisabled
                      ? 'cursor-not-allowed'
                      : 'hover:text-white hover:bg-blue-600'
                  }`}
                  onClick={() => {
                    setIsFieldDisabled(false);
                  }}
                  disabled={!isFieldDisabled}
                >
                  Edit
                </button>
                <button
                  type='submit'
                  className={`px-2 py-1 mr-2 w-[50%] text-green-700 border-2 rounded-md border-green-700 transition duration-200 ease-linear ${
                    isFieldDisabled
                      ? 'cursor-not-allowed'
                      : 'hover:text-white hover:bg-green-700'
                  }`}
                  form='eventForm'
                  disabled={isFieldDisabled}
                >
                  Save
                </button>
                <button
                  type='button'
                  className='px-2 py-1 w-[50%] text-red-600 border-2 rounded-md border-red-600 flex justify-center items-center hover:text-white hover:bg-red-600 transition duration-200 ease-linear'
                  onClick={deleteEvent}
                >
                  <FaTrashAlt className='mr-1' />
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditEvent;
