import { ReviewService } from '@/services/reviewService';
import { Reviews } from '@/services/reviewService/__generated__/Reviews';
import { action, makeObservable, observable } from 'mobx';
import { TReviewForm } from './types';

class ReviewStore {
  reviews: Reviews['reviewsByEventId'] = [];
  error: string = '';
  reviewForm: TReviewForm = {
    star: -1,
    description: ''
  };

  constructor() {
    makeObservable(this, {
      reviews: observable,
      error: observable,
      reviewForm: observable,
      setReviews: action.bound,
      getReviews: action,
      setReviewForm: action.bound,
      resetForm: action.bound,
      deleteReview: action.bound,
      setError: action.bound
    });
  }

  getReviews(eventId: string) {
    this.error = '';
    ReviewService.getReviews(eventId)
      .then((reviews) => this.setReviews(reviews))
      .catch((err) => this.setError(err.message));
  }

  setReviews(reviews: Reviews['reviewsByEventId']) {
    this.reviews = reviews;
  }

  setError(value: string) {
    this.error = value;
  }

  setReviewForm(reviewForm: TReviewForm) {
    this.reviewForm = reviewForm;
  }

  resetForm() {
    this.reviewForm = {
      star: -1,
      description: ''
    };
  }

  deleteReview(eventId: string, reviewId: string) {
    ReviewService.removeReview(eventId, reviewId)
      .then((res) => {
        if (res) {
          this.setReviews(
            this.reviews?.filter((review) => review.id !== reviewId) ?? []
          );
        }
      })
      .catch((err) => (this.error = err.message));
  }
}

export default new ReviewStore();
