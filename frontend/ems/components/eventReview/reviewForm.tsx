import { ReviewService } from '@/services/reviewService';
import { store } from 'app/stores';
import { observer } from 'mobx-react-lite';
import {
  ChangeEvent,
  FC,
  FormEvent,
  useEffect,
  useMemo,
  useState
} from 'react';
import { MdStar, MdStarOutline } from 'react-icons/md';

type TReviewForm = {
  eventId: string;
};

const ReviewForm: FC<TReviewForm> = ({ eventId }) => {
  const [hoverStarIndex, setHoverStarIndex] = useState<number>(-1);

  const {
    reviewForm,
    setReviewForm,
    resetForm,
    setReviews,
    reviews,
    setError
  } = store.review;

  const selectedStarIndex = useMemo(() => reviewForm.star, [reviewForm.star]);

  const isFieldDisabled = useMemo(() => {
    if (reviews?.length) {
      for (let review of reviews) {
        if (store.auth.user?.id === review.user.id) {
          return true;
        }
      }
    }
    return false;
  }, [reviews]);

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewForm({
      ...reviewForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setError('');
      e.preventDefault();
      console.log(reviewForm);

      if (reviewForm.star < 1) {
        setError('Star is required');
        return;
      }

      const res = await ReviewService.addReview(eventId, reviewForm);

      if (res.id) {
        if (reviews?.length) {
          setReviews([...reviews, res]);
        } else {
          setReviews([res]);
        }
        resetForm();
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleHoverStarChange = (value: number) => {
    setHoverStarIndex((prevState) => value);
  };

  const handleSelectedStar = (value: number) => {
    setReviewForm({
      ...reviewForm,
      star: value
    });
  };

  return (
    <div className=''>
      <form className='flex flex-col max-w-[500px]' onSubmit={handleSubmit}>
        <div className='flex'>
          <div className='w-[30%]'>Star</div>
          <div className='w-[70%]'>
            {[1, 2, 3, 4, 5].map((value) => {
              return (
                <div key={value} className='inline-block'>
                  {hoverStarIndex >= value || selectedStarIndex >= value ? (
                    <MdStar
                      className={`text-2xl text-yellow-700 transition-all duration-200 ease-out ${
                        isFieldDisabled
                          ? 'cursor-not-allowed'
                          : 'hover:cursor-pointer'
                      }`}
                      onMouseEnter={() =>
                        !isFieldDisabled ? handleHoverStarChange(+value) : ''
                      }
                      onMouseLeave={() =>
                        !isFieldDisabled ? handleHoverStarChange(-1) : ''
                      }
                      onClick={() =>
                        !isFieldDisabled ? handleSelectedStar(+value) : ''
                      }
                    />
                  ) : (
                    <MdStarOutline
                      className={`text-2xl text-yellow-700 transition-all duration-200 ease-out ${
                        isFieldDisabled
                          ? 'cursor-not-allowed'
                          : 'hover:cursor-pointer'
                      }`}
                      onMouseEnter={() =>
                        !isFieldDisabled ? handleHoverStarChange(value) : ''
                      }
                      onMouseLeave={() =>
                        !isFieldDisabled ? handleHoverStarChange(-1) : ''
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className='flex flex-col md:flex-row'>
          <label htmlFor='description' className='md:w-[30%]'>
            Description
          </label>
          <textarea
            name='description'
            id='description'
            className={`w-full md:w-[70%] px-2 py-1 rounded-md border-2 border-slate-400 outline-none transition-all duration-200 ease-out ${
              isFieldDisabled
                ? 'cursor-not-allowed'
                : 'hover:border-slate-700 focus:border-slate-700 focus:outline-none'
            }`}
            onChange={handleReviewChange}
            value={reviewForm.description}
            disabled={isFieldDisabled}
          ></textarea>
        </div>
        <div className='flex py-4'>
          <div className='w-[30%]'></div>
          <button
            type='submit'
            className={`px-2 py-1 border-2 rounded-md border-blue-600 text-blue-600 transition-all duration-200 ease-out ${
              isFieldDisabled
                ? 'cursor-not-allowed'
                : 'hover:text-white hover:bg-blue-600'
            }`}
            disabled={isFieldDisabled}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const ReviewFormView = observer(ReviewForm);

export { ReviewFormView as ReviewForm };
