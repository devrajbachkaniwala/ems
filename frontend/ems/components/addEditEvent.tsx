/* eslint-disable @next/next/no-img-element */
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
import { validate } from 'graphql';
import { EventValidation } from 'class/eventValidation';

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
  currency: 'inr',
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

  const [eventFormErrors, setEventFormErrors] = useState<
    Partial<TInitialEventState>
  >({});
  const [priceFormsError, setPriceFormsError] = useState<Partial<TPrice>[]>([
    {}
  ]);
  const [timingFormsError, setTimingFormsError] = useState<Partial<TTiming>[]>([
    {}
  ]);
  const [photoFormsError, setPhotoFormsError] = useState<Partial<TPhoto>[]>([
    {}
  ]);

  //const [isAllFieldValid, setIsAllFieldValid] = useState<boolean>(false);

  /* useEffect(() => {
    console.log('changed', isAllFieldValid.current);
  }, [isAllFieldValid]); */

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
        setPhotoFormsError((prevState) => {
          return prevState.map((photo, idx) => {
            if (idx === index) {
              return {
                ...photo,
                photo: 'Photo is required'
              };
            }
            return photo;
          });
        });
        return;
      }

      const file: File = e.target.files[0];

      const isValidImg: boolean = imageValidator(file);

      if (isValidImg) {
        setPhotoFormsError((prevState) => {
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

        setEventPhoto(file, index);
      }
    } catch (err: any) {
      setPhotoFormsError((prevState) => {
        return prevState.map((photo, idx) => {
          if (idx === index) {
            return {
              ...photo,
              photo: err.message
            };
          }
          return photo;
        });
      });

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

  const setError = (
    name:
      | keyof TInitialEventState
      | keyof TPrice
      | keyof TTiming
      | keyof TPhoto,
    value: string,
    noError: boolean,
    form: 'event' | 'price' | 'timing' | 'photo',
    index?: number
  ): boolean => {
    switch (form) {
      case 'event':
        setEventFormErrors((prevState) => ({ ...prevState, [name]: [value] }));
        return noError;

      case 'price':
        setPriceFormsError((prevState) => {
          return prevState.map((p, idx) => {
            if (idx === index) {
              return {
                ...p,
                [name]: value
              };
            }
            return p;
          });
        });
        return noError;

      case 'timing':
        setTimingFormsError((prevState) => {
          return prevState.map((t, idx) => {
            if (idx === index) {
              return {
                ...t,
                [name]: value
              };
            }
            return t;
          });
        });
        return noError;

      case 'photo':
        setPhotoFormsError((prevState) => {
          return prevState.map((p, idx) => {
            if (idx === index) {
              return {
                ...p,
                [name]: value
              };
            }
            return p;
          });
        });
        return noError;
      default:
        return false;
    }
  };

  const validate = async (): Promise<boolean> => {
    const isValidName = await EventValidation.eventName(eventForm.name)
      .then((res) => setError('name', '', res, 'event'))
      .catch((err) => setError('name', err.message, false, 'event'));

    const isValidDescription = await EventValidation.description(
      eventForm.description
    )
      .then((res) => setError('description', '', res, 'event'))
      .catch((err) => setError('description', err.message, false, 'event'));

    const isValidCity = await EventValidation.city(eventForm.city)
      .then((res) => setError('city', '', res, 'event'))
      .catch((err) => setError('city', err.message, false, 'event'));

    const isValidState = await EventValidation.state(eventForm.state)
      .then((res) => setError('state', '', res, 'event'))
      .catch((err) => setError('state', err.message, false, 'event'));

    const isValidCountry = await EventValidation.country(eventForm.country)
      .then((res) => setError('country', '', res, 'event'))
      .catch((err) => setError('country', err.message, false, 'event'));

    const isValidVenue = await EventValidation.venue(eventForm.venue)
      .then((res) => setError('venue', '', res, 'event'))
      .catch((err) => setError('venue', err.message, false, 'event'));

    const isValidCategory = await EventValidation.category(eventForm.category)
      .then((res) => setError('category', '', res, 'event'))
      .catch((err) => setError('category', err.message, false, 'event'));

    let idx = 0;
    let isPriceFieldsValid = false;
    for (let price of priceForms) {
      const isValid = await EventValidation.currency(price.currency)
        .then((res) => setError('currency', '', res, 'price', idx))
        .catch((err) => setError('currency', err.message, false, 'price', idx));
      if (!isValid) {
        isPriceFieldsValid = false;
        break;
      } else {
        isPriceFieldsValid = true;
      }
      idx += 1;
    }

    idx = 0;
    let isTimingFieldsValid = false;
    for (let timing of timingForms) {
      const isValidDate = await EventValidation.date(timing.date)
        .then((res) => setError('date', '', res, 'timing', idx))
        .catch((err) => setError('date', err.message, false, 'timing', idx));

      const isValidStartTime = await EventValidation.startTime(timing.startTime)
        .then((res) => setError('startTime', '', res, 'timing', idx))
        .catch((err) =>
          setError('startTime', err.message, false, 'timing', idx)
        );

      const isValidEndTime = await EventValidation.endTime(timing.endTime)
        .then((res) => setError('endTime', '', res, 'timing', idx))
        .catch((err) => setError('endTime', err.message, false, 'timing', idx));

      const isValidTimeDifference = await EventValidation.timeDifference(
        timing.startTime,
        timing.endTime
      )
        .then((res) => setError('startTime', '', res, 'timing', idx))
        .catch((err) =>
          setError('startTime', err.message, false, 'timing', idx)
        );

      if (
        !(
          isValidDate &&
          isValidStartTime &&
          isValidEndTime &&
          isValidTimeDifference
        )
      ) {
        isTimingFieldsValid = false;
        break;
      } else {
        isTimingFieldsValid = true;
      }
      idx += 1;
    }

    idx = 0;
    let isPhotoFieldsValid = false;
    for (let photo of photoForms) {
      const isValidPhoto = await new Promise(
        (
          resolve: (value: boolean) => void,
          reject: (value: string) => void
        ) => {
          if (!photo.photo) {
            reject('Photo is required');
          }

          resolve(true);
        }
      )
        .then((res) => setError('photo', '', res, 'photo', idx))
        .catch((err) => setError('photo', err, false, 'photo', idx));

      if (!isValidPhoto) {
        isPhotoFieldsValid = false;
        break;
      } else {
        isPhotoFieldsValid = true;
      }
      idx += 1;
    }

    if (
      !(
        isValidName &&
        isValidDescription &&
        isValidCity &&
        isValidState &&
        isValidCountry &&
        isValidVenue &&
        isValidCategory &&
        isPriceFieldsValid &&
        isTimingFieldsValid &&
        isPhotoFieldsValid
      )
    ) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await validate();

    if (!isValid) {
      console.log('validation error');
      return;
    }

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
        priceForms.map(async (p, idx) => {
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
              setPriceForms((prevState) => {
                return prevState.map((p, index) => {
                  if (index === idx) {
                    return {
                      ...p,
                      ...priceRes
                    };
                  }
                  return p;
                });
              });
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

        timingForms.map(async (timing, idx) => {
          try {
            const { __typename, id, ...restTiming } = timing;
            if (!id) {
              const timingRes =
                await eventTimingService.addEventTimingByEventId(
                  eventId,
                  restTiming
                );
              setTimingForms((prevState) => {
                return prevState.map((t, index) => {
                  if (index === idx) {
                    return {
                      ...t,
                      ...timingRes
                    };
                  }
                  return t;
                });
              });
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

        photoForms.map(async (p, idx) => {
          try {
            const { __typename, id, photo } = p;
            if (!id) {
              const photoRes = await eventPhotoService.addEventPhotoByEventId(
                eventId,
                photo
              );
              setPhotoForms((prevState) => {
                return prevState.map((pic, index) => {
                  if (index === idx) {
                    return {
                      ...pic,
                      ...photoRes
                    };
                  }
                  return pic;
                });
              });
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
    if (priceId) {
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

      setPriceFormsError((prevState) => {
        return prevState.filter((price, idx) => {
          return idx !== index;
        });
      });
    } else {
      setPriceForms((prevState) => {
        return prevState.filter((price, idx) => {
          return idx !== index;
        });
      });

      setPriceFormsError((prevState) => {
        return prevState.filter((price, idx) => {
          return idx !== index;
        });
      });
    }
  };

  const removeTimingById = async (index: number, timingId?: string) => {
    if (timingId) {
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

      setTimingFormsError((prevState) => {
        return prevState.filter((timing, idx) => {
          return idx !== index;
        });
      });
    } else {
      setTimingForms((prevState) => {
        return prevState.filter((timing, idx) => {
          return idx !== index;
        });
      });

      setTimingFormsError((prevState) => {
        return prevState.filter((timing, idx) => {
          return idx !== index;
        });
      });
    }
  };

  const removePhotoById = async (index: number, photoId?: string) => {
    if (photoId) {
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

      setPhotoFormsError((prevState) => {
        return prevState.filter((photo, idx) => {
          return idx !== index;
        });
      });
    } else {
      setPhotoForms((prevState) => {
        return prevState.filter((photo, idx) => {
          return idx !== index;
        });
      });

      setPhotoFormsError((prevState) => {
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
    <div className='min-h-[80vh] text-slate-700'>
      <div className='w-full md:w-4/5 h-full mb-4 mx-auto'>
        <h2 className='text-center text-2xl font-semibold my-5'>
          {isAddMode ? 'Create an event' : 'Update an event'}
        </h2>
        <div className='mx-2'>
          <form name='event' id='eventForm' onSubmit={handleSubmit}>
            {eventFormErrors.name && (
              <div className='input-error'>{eventFormErrors.name}</div>
            )}

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

            {eventFormErrors.description && (
              <div className='input-error'>{eventFormErrors.description}</div>
            )}

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

            {eventFormErrors.city && (
              <div className='input-error'>{eventFormErrors.city}</div>
            )}

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

            {eventFormErrors.state && (
              <div className='input-error'>{eventFormErrors.state}</div>
            )}

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

            {eventFormErrors.country && (
              <div className='input-error'>{eventFormErrors.country}</div>
            )}

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

            {eventFormErrors.venue && (
              <div className='input-error'>{eventFormErrors.venue}</div>
            )}

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

            {eventFormErrors.category && (
              <div className='input-error'>{eventFormErrors.category}</div>
            )}

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
                  <form
                    key={index}
                    className='w-full'
                    onSubmit={(e) => handleSubmit(e)}
                  >
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
                        min='0'
                      />
                    </div>

                    {priceFormsError.length &&
                    priceFormsError[index]?.currency ? (
                      <div className='input-error'>
                        {priceFormsError[index].currency}
                      </div>
                    ) : (
                      ''
                    )}

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
                        className={`w-[60%] px-2 py-1 border-2 border-slate-400 rounded-md uppercase transition duration-200 ease-linear ${
                          isFieldDisabled
                            ? 'cursor-not-allowed'
                            : 'hover:border-slate-700 focus:outline-none focus:border-slate-700'
                        }`}
                        disabled={isFieldDisabled}
                        maxLength={3}
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
                        min='0'
                      />
                    </div>
                    <button type='submit' className='hidden'>
                      Submit
                    </button>
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
                  setPriceFormsError((prevState) => [...prevState, {}]);
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
                  <form key={index} className='w-full' onSubmit={handleSubmit}>
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

                    {timingFormsError.length &&
                    timingFormsError[index]?.date ? (
                      <div className='input-error'>
                        {timingFormsError[index].date}
                      </div>
                    ) : (
                      ''
                    )}

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

                    {timingFormsError.length &&
                    timingFormsError[index]?.startTime ? (
                      <div className='input-error'>
                        {timingFormsError[index].startTime}
                      </div>
                    ) : (
                      ''
                    )}

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

                    {timingFormsError.length &&
                    timingFormsError[index]?.endTime ? (
                      <div className='input-error'>
                        {timingFormsError[index].endTime}
                      </div>
                    ) : (
                      ''
                    )}

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
                    <button type='submit' className='hidden'>
                      Submit
                    </button>
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

                  setTimingFormsError((prevState) => [...prevState, {}]);
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
                    {photoFormsError.length && photoFormsError[index]?.photo ? (
                      <div className='input-error'>
                        {photoFormsError[index].photo}
                      </div>
                    ) : (
                      ''
                    )}

                    <h3 className='px-2 py-1 font-semibold flex items-center'>
                      <div>Photo {/* index + 1 */}</div>
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

            {/* <div>
              <button
                type='button'
                onClick={() => {
                  setPhotoForms((prevState) => [
                    ...prevState,
                    initialPhotoState
                  ]);

                  setPhotoFormsError((prevState) => [...prevState, {}]);
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
            </div> */}
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
