import BookingEventLists from 'components/my-bookingsPage/bookingEventLists';

export type TMyBookings = {
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

export const myBookingsData: TMyBookings[] = [
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

const MyBookings = () => {
  const activeBookings = myBookingsData.filter((booking) => {
    return booking.bookingItem.status === 'active';
  });

  const canceledBookings = myBookingsData.filter((booking) => {
    return booking.bookingItem.status === 'cancel';
  });

  return (
    <div>
      <article className=' text-slate-700'>
        <h2 className='text-center text-xl font-bold'>My Bookings</h2>
        <section>
          <BookingEventLists myBookings={activeBookings}>
            <h2 className='mt-4 font-semibold'>Active Bookings</h2>
          </BookingEventLists>

          <BookingEventLists myBookings={canceledBookings}>
            <h2 className='mt-4 font-semibold'>Canceled Bookings</h2>
          </BookingEventLists>
        </section>
      </article>
    </div>
  );
};

export default MyBookings;
