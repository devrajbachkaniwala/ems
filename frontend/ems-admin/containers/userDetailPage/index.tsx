import userService from '@/services/userService';
import { UserDetail } from '@/services/userService/__generated__/UserDetail';
import LoadingSpinner from 'components/loadingSpinner';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import BookingList from './bookingList';
import UserTable from './userTable';

type TUserDetailPageProps = {
  userId: string;
};

const UserDetailPage: FC<TUserDetailPageProps> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserDetail['userById'] | undefined>();

  const router = useRouter();

  useEffect(() => {
    userService
      .getUserById(userId)
      .then((userDetail) => {
        if (!userDetail?.id) {
          router.replace('/404');
        }
        setUser(userDetail);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId, router]);

  if (!user && isLoading) {
    return (
      <div className='min-h-[100vh] overflow-auto flex justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section className='min-h-[80vh] overflow-auto px-2 flex flex-col sm:items-center'>
      <UserTable user={user!} />
      <div className='text-center text-lg font-medium text-slate-700 mt-6'>
        {`${user?.fullName}'s Bookings `}
      </div>
      {user?.bookings?.length ? (
        <BookingList bookings={user.bookings} />
      ) : (
        <div className='text-center text-lg font-medium text-slate-700 mt-4'>
          No Bookings
        </div>
      )}
    </section>
  );
};

export { UserDetailPage };
