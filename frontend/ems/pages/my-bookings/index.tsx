import authService from '@/services/authService';
import bookingService from '@/services/bookingService';
import { GetUserBookings } from '@/services/bookingService/__generated__/GetUserBookings';
import Footer from 'components/footer';
import Header from 'components/header';
import LoadingSpinner from 'components/loadingSpinner';
import BookingEventLists from 'components/my-bookingsPage/bookingEventLists';
import { ProtectedRoute } from 'components/protectedRoute';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TPageLayout } from 'types/pageLayout';

export type TMyBooking = {
  id: number;
  event: {
    id: number;
    name: string;
    description: string;
    city: string;
    state: string;
    venue: string;
    category: string;
    photos: {
      id: number;
      photo: string;
    }[];
  };
  bookingItem: {
    id: number;
    qty: number;
    status: string;
    price: {
      id: number;
      price: number;
      currency: string;
    };
    organization: {
      id: number;
      name: string;
      description: string;
      contactNo: string;
      email: string;
      photo: string;
    };
    timing: {
      id: number;
      date: Date;
      startTime: string;
      endTime: string;
    };
  };
};

export const myBookingsData: TMyBooking[] = [
  {
    id: 1,
    event: {
      id: 101,
      name: 'Food event',
      city: 'Surat',
      state: 'Gujarat',
      venue: 'city light',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio veniam distinctio obcaecati minima. Aspernatur aperiam molestias repellendus? Ut animi sunt veniam, tempora harum iste officiis perferendis quis, dignissimos mollitia placeat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate fugit voluptate quis? Voluptatibus aut accusamus dolor quas nam, pariatur, in ab aliquam et a rerum ad sit, non minima fuga.',
      category: 'food',
      photos: [
        {
          id: 901,
          photo: '/images/event-pic-1.jpg'
        }
      ]
    },
    bookingItem: {
      id: 201,
      qty: 2,
      status: 'active',
      organization: {
        id: 301,
        name: 'food event organization',
        description: 'food event org description',
        email: 'test@sample.com',
        contactNo: '1234567890',
        photo: '/images/event-pic-2.jpg'
      },
      price: {
        id: 401,
        price: 199,
        currency: 'INR'
      },
      timing: {
        id: 501,
        date: new Date('2022-03-11'),
        startTime: '11:00',
        endTime: '17:00'
      }
    }
  },
  {
    id: 2,
    event: {
      id: 102,
      name: 'Car event',
      city: 'Surat',
      state: 'Gujarat',
      venue: 'city light',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio veniam distinctio obcaecati minima. Aspernatur aperiam molestias repellendus? Ut animi sunt veniam, tempora harum iste officiis perferendis quis, dignissimos mollitia placeat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate fugit voluptate quis? Voluptatibus aut accusamus dolor quas nam, pariatur, in ab aliquam et a rerum ad sit, non minima fuga.',
      category: 'car',
      photos: [
        {
          id: 902,
          photo: '/images/event-pic-2.jpg'
        }
      ]
    },
    bookingItem: {
      id: 202,
      qty: 4,
      status: 'active',
      organization: {
        id: 302,
        name: 'car event organization',
        description: 'car event org description',
        email: 'test@sample.com',
        contactNo: '1234567890',
        photo: '/images/event-pic-3.jpg'
      },
      price: {
        id: 402,
        price: 399,
        currency: 'INR'
      },
      timing: {
        id: 502,
        date: new Date('2022-03-22'),
        startTime: '17:00',
        endTime: '22:00'
      }
    }
  },
  {
    id: 3,
    event: {
      id: 103,
      name: 'Sport event',
      city: 'Surat',
      state: 'Gujarat',
      venue: 'city light',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio veniam distinctio obcaecati minima. Aspernatur aperiam molestias repellendus? Ut animi sunt veniam, tempora harum iste officiis perferendis quis, dignissimos mollitia placeat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate fugit voluptate quis? Voluptatibus aut accusamus dolor quas nam, pariatur, in ab aliquam et a rerum ad sit, non minima fuga.',
      category: 'sport',
      photos: [
        {
          id: 903,
          photo: '/images/event-pic-3.jpg'
        }
      ]
    },
    bookingItem: {
      id: 203,
      qty: 5,
      status: 'cancel',
      organization: {
        id: 303,
        name: 'Sport event organization',
        description: 'sport event org description',
        email: 'test@sample.com',
        contactNo: '1234567890',
        photo: '/images/event-pic-1.jpg'
      },
      price: {
        id: 403,
        price: 599,
        currency: 'INR'
      },
      timing: {
        id: 503,
        date: new Date('2022-03-03'),
        startTime: '10:00',
        endTime: '19:00'
      }
    }
  }
];

const MyBookings: NextPage & TPageLayout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [myBookings, setmyBookings] = useState<
    GetUserBookings['myBookings'] | undefined
  >();
  const [activeBookings, setActiveBookings] = useState<
    GetUserBookings['myBookings'] | undefined
  >();
  const [canceledBookings, setCanceledBookings] = useState<
    GetUserBookings['myBookings'] | undefined
  >();
  const router = useRouter();

  useEffect(() => {
    /* authService
      .getUserProfile()
      .then((user) => {
        bookingService
          .getUserBookings()
          .then((bookings) => {
            setmyBookings(bookings);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        router.replace('/login');
      }); */
    bookingService
      .getUserBookings()
      .then((bookings) => {
        setmyBookings(bookings);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (myBookings?.length) {
      setActiveBookings(
        myBookings.filter((booking) => {
          return booking.bookingItem.status === 'active';
        })
      );

      setCanceledBookings(
        myBookings.filter((booking) => {
          return booking.bookingItem.status === 'cancel';
        })
      );
    }
  }, [myBookings]);

  /*  const activeBookings = (bookings: GetUserBookings['myBookings']) =>
    bookings!.filter((booking) => {
      return booking.bookingItem.status === 'active';
    });

  const canceledBookings = (bookings: GetUserBookings['myBookings']) =>
    bookings!.filter((booking) => {
      return booking.bookingItem.status === 'cancel';
    }); */

  if (!myBookings && isLoading) {
    return (
      <div className='min-h-[80vh] overflow-auto flex justify-center fade-in-out'>
        <LoadingSpinner />
      </div>
    );
  }

  const cancelBooking = async (bookingId: string) => {
    const res = await bookingService.cancelBooking(bookingId);

    if (res) {
      console.log('success');
      setmyBookings((prevState) => {
        return prevState?.map((booking) => {
          if (booking.id === bookingId) {
            const item = booking.bookingItem;
            return {
              ...booking,
              bookingItem: {
                ...item,
                status: 'cancel'
              }
            };
          }
          return booking;
        });
      });
    }
  };

  return (
    <div className='min-h-[80vh] overflow-auto'>
      <h2 className='text-center text-xl font-bold text-slate-700'>
        My Bookings
      </h2>
      {myBookings?.length ? (
        <article className=' text-slate-700'>
          <section>
            <BookingEventLists
              myBookings={activeBookings ?? []}
              isActive
              cancelBooking={cancelBooking}
            />

            <BookingEventLists
              myBookings={canceledBookings ?? []}
              isCanceled
              cancelBooking={cancelBooking}
            />
          </section>
        </article>
      ) : (
        <div className='text-center mt-2'>No Bookings</div>
      )}
    </div>
  );
};

export default MyBookings;

MyBookings.getLayout = (page: any) => {
  return (
    <>
      <ProtectedRoute role='user'>
        <Header />
        {page}
        <Footer />
      </ProtectedRoute>
    </>
  );
};
