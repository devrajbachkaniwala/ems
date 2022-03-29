import authService from '@/services/authService';
import eventService from '@/services/eventService';
import { EventDetail } from '@/services/eventService/__generated__/EventDetail';
import { store } from 'app/stores';
import AddEditEvent from 'components/addEditEvent';
import Footer from 'components/footer';
import Header from 'components/header';
import LoadingSpinner from 'components/loadingSpinner';
import { ProtectedRoute } from 'components/protectedRoute';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { TPageLayout } from 'types/pageLayout';

const EditEvent: NextPage & TPageLayout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const eventId = router.query.eventId as string;

  const [event, setEvent] = useState<EventDetail['eventById'] | undefined>();

  useEffect(() => {
    if (eventId) {
      eventService
        .getEventById(eventId)
        .then((event) => {
          if (event.organization.id === store.auth.user?.organization?.id) {
            console.log(event);
            setEvent(event);
            setIsLoading(false);
          } else {
            router.push('/events/add');
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(JSON.stringify(err));
          router.push('/events/add');
        });
    }
  }, [eventId, router]);

  if (!event && isLoading) {
    return (
      <div className='min-h-[80vh] overflow-auto flex justify-center fade-in-out'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <AddEditEvent event={event} />
    </>
  );
};

export default EditEvent;

EditEvent.getLayout = (page: any) => {
  return (
    <>
      <ProtectedRoute role='organization'>
        <Header />
        {page}
        <Footer />
      </ProtectedRoute>
    </>
  );
};
