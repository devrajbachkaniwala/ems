import authService from '@/services/authService';
import { UserProfile } from '@/services/authService/__generated__/UserProfile';
import { store } from 'app/stores';
import { Footer } from 'components/footer';
import { Header } from 'components/header';
import { ProtectedRoute } from 'components/protectedRoute';
import { UserListPage } from 'containers/userListPage';
import { observer } from 'mobx-react-lite';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

const Home: NextPage & { getLayout: (page: any) => ReactNode } = () => {
  /*  const [isLoading, setIsLoading] = useState<boolean>(true);
  //const [adminUser, setAdminUser] = useState<UserProfile['user'] | undefined>();
  //const { user, setUser } = store.auth;

  const router = useRouter();

  useEffect(() => {
    if (store.auth.user?.id) {
      return;
    }
    authService
      .getUserProfile()
      .then((adminDetail) => {
        if (!adminDetail.id) {
          router.replace('/login');
        }
        store.auth.setUser(adminDetail);
        //setUser(adminDetail);
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
      <UserListPage />
    </>
  );
};

Home.getLayout = (page: any) => {
  return (
    <>
      <ProtectedRoute>
        <Header />
        {page}
        <Footer />
      </ProtectedRoute>
    </>
  );
};
export default observer(Home);
