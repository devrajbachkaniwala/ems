import { apolloClient } from 'app/graphql';
import { AddReviewInput, UpdateReviewInput } from '__generated__/globalTypes';
import { ADD_REVIEW, REMOVE_REVIEW, UPDATE_REVIEW } from './mutation';
import { GET_REVIEWS } from './queries';
import { AddReview, AddReviewVariables } from './__generated__/AddReview';
import {
  RemoveReview,
  RemoveReviewVariables
} from './__generated__/RemoveReview';
import { Reviews, ReviewsVariables } from './__generated__/Reviews';
import {
  UpdateReview,
  UpdateReviewVariables
} from './__generated__/UpdateReview';

export class ReviewService {
  static async addReview(eventId: string, data: AddReviewInput) {
    try {
      const res = await apolloClient.mutate<AddReview, AddReviewVariables>({
        mutation: ADD_REVIEW,
        variables: { eventId, data }
      });

      if (!res || !res.data) {
        throw new Error('Failed to add review');
      }
      return res.data.addReviewByEventId;
    } catch (err: any) {
      console.log(JSON.stringify(err));
      throw err;
    }
  }

  static async updateReview(
    eventId: string,
    reviewId: string,
    data: UpdateReviewInput
  ) {
    try {
      const res = await apolloClient.mutate<
        UpdateReview,
        UpdateReviewVariables
      >({
        mutation: UPDATE_REVIEW,
        variables: { eventId, reviewId, data }
      });

      if (!res || !res.data) {
        throw new Error('Failed to update review');
      }
      return res.data.updateReviewById;
    } catch (err: any) {
      console.log(JSON.stringify(err));
      throw err;
    }
  }

  static async removeReview(eventId: string, reviewId: string) {
    try {
      const res = await apolloClient.mutate<
        RemoveReview,
        RemoveReviewVariables
      >({
        mutation: REMOVE_REVIEW,
        variables: { eventId, reviewId }
      });

      if (!res || !res.data) {
        throw new Error('Failed to remove review');
      }
      return res.data.removeReviewById;
    } catch (err: any) {
      console.log(JSON.stringify(err));
      throw err;
    }
  }

  static async getReviews(eventId: string) {
    try {
      const res = await apolloClient.query<Reviews, ReviewsVariables>({
        query: GET_REVIEWS,
        variables: { eventId }
      });

      if (!res || !res.data) {
        throw new Error('Failed to get reviews');
      }
      return res.data.reviewsByEventId;
    } catch (err: any) {
      console.log(JSON.stringify(err));
      throw err;
    }
  }
}
