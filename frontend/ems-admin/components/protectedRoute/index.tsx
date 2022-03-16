import authService from '@/services/authService';
import { store } from 'app/stores';
import LoadingSpinner from 'components/loadingSpinner';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useState } from 'react';

type TProtectedRoute = {
  children: ReactNode;
};

const ProtectedRoute: FC<TProtectedRoute> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    if (store.auth.user?.id) {
      setIsLoading(false);
      return;
    }
    authService
      .getUserProfile()
      .then((adminDetail) => {
        if (!adminDetail.id) {
          router.replace('/login');
          return;
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
    return (
      <div className='min-h-[100vh] overflow-auto flex justify-center'>
        <LoadingSpinner />
      </div>
    );
  }
  return <>{children}</>;
};

const ProtectedRouteView = observer(ProtectedRoute);

export { ProtectedRouteView as ProtectedRoute };
