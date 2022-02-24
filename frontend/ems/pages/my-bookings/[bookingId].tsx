import BookedEventDetail from 'components/my-bookingsPage/bookedEventDetail';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { myBookingsData, TMyBookings } from '.';

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

const BookingDetail = () => {
  const router = useRouter();
  const { bookingId } = router.query;

  if (bookingId && !Array.isArray(bookingId)) {
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
  }
};

export default BookingDetail;

export async function getServerSideProps() {
  return {
    props: {}
  };
}
