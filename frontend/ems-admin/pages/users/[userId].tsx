import authService from '@/services/authService';
import { UserProfile } from '@/services/authService/__generated__/UserProfile';
import { store } from 'app/stores';
import { Footer } from 'components/footer';
import { Header } from 'components/header';
import { ProtectedRoute } from 'components/protectedRoute';
import { UserDetailPage } from 'containers/userDetailPage';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

const UserDetail: NextPage & { getLayout: (page: any) => ReactNode } = () => {
  /*   const [isLoading, setIsLoading] = useState<boolean>(true);
  //const [adminUser, setAdminUser] = useState<UserProfile['user'] | undefined>(); */

  const router = useRouter();
  const userId = router.query.userId as string;

  /*  useEffect(() => {
    if (store.auth.user?.id) {
      console.log('there');
      return;
    }
    authService
      .getUserProfile()
      .then((adminDetail) => {
        if (!adminDetail.id) {
          router.replace('/login');
        }
        store.auth.setUser(adminDetail);
        //setAdminUser(adminDetail);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        router.replace('/login');
      });
  }, [router]);

  if (!store.auth.user && isLoading) {
    return <div>Loading...</div>;
  } */
  return (
    <>
      <UserDetailPage userId={userId} />
    </>
  );
};

export default UserDetail;

UserDetail.getLayout = (page: any) => {
  return (
    <ProtectedRoute>
      <Header />
      {page}
      <Footer />
    </ProtectedRoute>
  );
};
