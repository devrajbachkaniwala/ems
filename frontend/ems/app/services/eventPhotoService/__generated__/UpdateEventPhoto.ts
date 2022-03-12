/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateEventPhoto
// ====================================================

export interface UpdateEventPhoto_updateEventPhotoById {
  __typename: "EventPhoto";
  id: string;
  photo: string;
}

export interface UpdateEventPhoto {
  updateEventPhotoById: UpdateEventPhoto_updateEventPhotoById;
}

export interface UpdateEventPhotoVariables {
  eventId: string;
  photo: string;
  photoId: string;
}
