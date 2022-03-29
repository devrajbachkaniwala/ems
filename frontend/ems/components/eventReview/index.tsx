import { store } from 'app/stores';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { ReviewForm } from './reviewForm';
import { ReviewList } from './reviewList';

type TEventReview = {
  eventId: string;
};

const EventReview: FC<TEventReview> = ({ eventId }) => {
  const { error, reviews } = store.review;

  useEffect(() => {
    store.review.getReviews(eventId);
  }, [eventId]);

  return (
    <div className='border-t-2'>
      <div className='text-slate-700 px-12 py-4'>
        {error && <span className='input-error'>{error}</span>}
        <ReviewForm eventId={eventId} />
        <div className='font-bold text-lg'>Reviews</div>
        <ReviewList eventId={eventId} />
      </div>
    </div>
  );
};

const EventReviewView = observer(EventReview);

export { EventReviewView as EventReview };
