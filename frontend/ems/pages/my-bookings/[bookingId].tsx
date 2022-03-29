import authService from '@/services/authService';
import bookingService from '@/services/bookingService';
import { BookingDetail } from '@/services/bookingService/__generated__/BookingDetail';
import Footer from 'components/footer';
import Header from 'components/header';
import BookedEventDetail from 'components/my-bookingsPage/bookedEventDetail';
import { ProtectedRoute } from 'components/protectedRoute';
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TPageLayout } from 'types/pageLayout';
import { myBookingsData, TMyBooking } from '.';

/* type TEvent = {
  id: number;
  name: string;
  city: string;
  state: string;
  timings: {
    date: Date;
    time: string;
  }[];
  photos: {
    photo: string;
  }[];
  prices: {
    price: number;
  }[];
}; */

type TBookedEventDetail = {
  id: number;
  name: string;
  description: string;
  city: string;
  state: string;
  venue: string;
  category: string;
  organization: {
    name: string;
    contactNo: string;
    email: string;
    photo: string;
  }[];
  photos: {
    photo: string;
  }[];
  timings: {
    date: Date;
    startTime: string;
    endTime: string;
  }[];
  prices: {
    price: number;
    currency: string;
    sold: number;
  }[];
  reviews: {
    id: number;
    description: string;
    star: number;
    user: {
      id: number;
      username: string;
    };
  };
};

const BookingDetail: NextPage & TPageLayout = () => {
  const router = useRouter();
  const bookingId = router.query.bookingId as string;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookingDetail, setBookingDetail] = useState<
    BookingDetail['bookingById'] | undefined
  >();

  useEffect(() => {
    if (bookingId) {
      bookingService
        .getBookingById(bookingId)
        .then((booking) => {
          if (!booking?.id) {
            router.replace('/my-bookings');
          }
          setBookingDetail(booking);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          router.replace('/my-bookings');
        });
    }
  }, [bookingId, router]);

  if (!bookingDetail && isLoading) {
    return <div>Loading...</div>;
  }

  const cancelBooking = async (bookingId: string) => {
    const res = await bookingService.cancelBooking(bookingId);

    if (res) {
      console.log('success');
      setBookingDetail((prevState) => {
        if (!prevState) {
          return;
        }
        const item = prevState?.bookingItem;
        return {
          ...prevState,
          bookingItem: {
            ...item,
            status: 'cancel'
          }
        };
      });
    }
  };

  return (
    <>
      {bookingDetail?.id ? (
        <BookedEventDetail
          booking={bookingDetail}
          cancelBooking={cancelBooking}
        />
      ) : (
        <div>Booking detail not found</div>
      )}
    </>
  );

  /*  if (bookingId && !Array.isArray(bookingId)) {
    const booking = myBookingsData.find((booking) => {
      return booking.id === parseInt(bookingId);
    });

    if (!booking) return null;
    return (
      <div>
        <BookedEventDetail booking={booking} />
      </div>
    );
  } else {
    router.push('/');
  } */
};

export default BookingDetail;

BookingDetail.getLayout = (page: any) => {
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
