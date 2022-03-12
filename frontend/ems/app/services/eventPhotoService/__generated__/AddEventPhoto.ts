/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddEventPhoto
// ====================================================

export interface AddEventPhoto_addEventPhotoByEventId {
  __typename: "EventPhoto";
  id: string;
  photo: string;
}

export interface AddEventPhoto {
  addEventPhotoByEventId: AddEventPhoto_addEventPhotoByEventId;
}

export interface AddEventPhotoVariables {
  photo: string;
  eventId: string;
}
