import { Reviews_reviewsByEventId } from '@/services/reviewService/__generated__/Reviews';
import { store } from 'app/stores';
import Image from 'next/image';
import React, { FC, MouseEventHandler } from 'react';
import { MdStar, MdStarOutline } from 'react-icons/md';

type TReviewListItem = {
  review: Reviews_reviewsByEventId;
  eventId: string;
};

const ReviewListItem: FC<TReviewListItem> = ({ review, eventId }) => {
  const {
    id: reviewId,
    star,
    description,
    user: { userPhoto, username, id }
  } = review;

  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    store.review.deleteReview(eventId, reviewId);
  };

  return (
    <section className='border-2 rounded-md my-4 p-4'>
      <div className='flex items-center'>
        <div className='w-[40px] h-[40px] rounded-full object-cover bg-slate-200'>
          {userPhoto ? (
            <Image
              src={userPhoto}
              alt={username}
              width='40'
              height='40'
              className='rounded-full object-cover'
            />
          ) : (
            ''
          )}
        </div>
        <div className='ml-2 font-semibold'>{username}</div>
      </div>
      <div className='mt-2 flex items-center'>
        {[1, 2, 3, 4, 5].map((value) => {
          return (
            <div key={value} className='inline-block'>
              {star >= value ? (
                <MdStar className='text-2xl text-yellow-700 transition-all duration-200 ease-out' />
              ) : (
                <MdStarOutline className='text-2xl text-yellow-700 transition-all duration-200 ease-out' />
              )}
            </div>
          );
        })}
      </div>
      <div className='px-1'>{description}</div>
      {store.auth.user?.id === id ? (
        <div className='px-1 mt-2'>
          <button
            type='button'
            className='px-2 py-1 text-red-600 border-2 rounded-md border-red-600 hover:text-white hover:bg-red-600 outline-none focus:outline-none transition-all duration-200 ease-out'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      ) : (
        ''
      )}
    </section>
  );
};

export default ReviewListItem;
