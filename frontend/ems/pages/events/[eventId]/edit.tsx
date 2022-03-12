import authService from '@/services/authService';
import eventService from '@/services/eventService';
import { EventDetail } from '@/services/eventService/__generated__/EventDetail';
import AddEditEvent from 'components/addEditEvent';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

const EditEvent: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const eventId = router.query.eventId as string;

  const [event, setEvent] = useState<EventDetail['eventById'] | undefined>();

  useEffect(() => {
    if (eventId) {
      authService
        .getUserProfile()
        .then((user) => {
          if (user.organization?.id) {
            eventService
              .getEventById(eventId)
              .then((event) => {
                if (event.organization.id === user.organization?.id) {
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
          } else {
            router.push('/organization/add');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [eventId, router]);

  if (!event && isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AddEditEvent event={event} />
    </>
  );
};

export default EditEvent;
