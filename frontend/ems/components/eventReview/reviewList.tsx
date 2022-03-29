import { Reviews } from '@/services/reviewService/__generated__/Reviews';
import { store } from 'app/stores';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import ReviewListItem from './reviewListItem';

type TReviewList = {
  eventId: string;
};

const ReviewList: FC<TReviewList> = ({ eventId }) => {
  const { reviews } = store.review;
  return (
    <>
      {reviews?.length ? (
        reviews.map((review) => {
          return (
            <ReviewListItem key={review.id} review={review} eventId={eventId} />
          );
        })
      ) : (
        <div className='font-medium'>No reviews</div>
      )}
    </>
  );
};

const ReviewListView = observer(ReviewList);

export { ReviewListView as ReviewList };
