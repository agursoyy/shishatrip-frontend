import { func } from 'prop-types';
import { RootState } from '..';
import {
  LocationFormActionTypes,
  GO_TO_STEP_1,
  GO_TO_STEP_2,
  GO_TO_STEP_3,
  Param,
  LocationParam,
  CLEAR_NEW_LOCATION_FORM,
  FILL_HEADER_INPUT,
  UPLOAD_CAFE_PHOTO,
  REMOVE_CAFE_PHOTO,
  FILL_STEP_2,
  UPLOAD_CAFE_STORY,
  REMOVE_CAFE_STORY,
} from './types';

export function fillHeaderInput(input: any) {
  return async (dispatch: any, getState: () => RootState) => {
    const { locationForm } = getState();
    let isFilled = false;
    let headerForm = { ...locationForm.header, ...input };
    const { logo_img, name, category_id } = headerForm;
    if (logo_img && name && category_id > -1) {
      isFilled = true;
    }
    dispatch({
      type: FILL_HEADER_INPUT,
      payload: {
        header: input,
        isFilled,
      },
    });
  };
}

export function uploadCafePhoto(img: string) {
  // base64 image.
  return {
    type: UPLOAD_CAFE_PHOTO,
    payload: img,
  };
}

export function removeCafePhoto(img: string) {
  return async (dispatch: any, getState: () => RootState) => {
    const {
      locationForm: {
        step1: { photos },
      },
    } = getState();
    const removed = photos.filter((p: string) => p != img);
    dispatch({
      type: REMOVE_CAFE_PHOTO,
      payload: removed,
    });
  };
}

export function uploadCafeStory(img: string) {
  // base64 image.
  return {
    type: UPLOAD_CAFE_STORY,
    payload: img,
  };
}

export function removeCafeStory(img: string) {
  return async (dispatch: any, getState: () => RootState) => {
    const {
      locationForm: {
        step3: { stories },
      },
    } = getState();
    const removed = stories.filter((p: string) => p != img);
    dispatch({
      type: REMOVE_CAFE_STORY,
      payload: removed,
    });
  };
}

export function fillLocationStep2(step2: any) {
  return async (dispatch: any, getState: () => RootState) => {
    const { locationForm } = getState();
    let isFilled = false;
    let formStep2 = { ...locationForm.step2, ...step2 };
    const { address, telephone, website } = formStep2;
    if (address && telephone && website) {
      isFilled = true;
    }
    dispatch({
      type: FILL_STEP_2,
      payload: { step2, isFilled },
    });
  };
}

export function clearRegisterForm(): LocationFormActionTypes {
  return { type: CLEAR_NEW_LOCATION_FORM };
}
