export const FILL_HEADER_INPUT = 'FILL_HEADER_INPUT';
export const UPLOAD_CAFE_PHOTO = 'UPLOAD_CAFE_PHOTO';
export const REMOVE_CAFE_PHOTO = 'REMOVE_CAFE_PHOTO';
export const UPLOAD_CAFE_STORY = 'UPLOAD_CAFE_STORY';
export const REMOVE_CAFE_STORY = 'REMOVE_CAFE_STORY';
export const FILL_STEP_2 = 'FILL_STEP_2';
export const GO_TO_STEP_1 = 'GO_TO_STEP_1';
export const GO_TO_STEP_2 = 'GO_TO_STEP_2';
export const GO_TO_STEP_3 = 'GO_TO_STEP_3';
export const CLEAR_NEW_LOCATION_FORM = 'CLEAR_NEW_LOCATION_FORM';

interface headerData {
  logo_img: string;
  name: string;
  category_id: number;
  cafe_address?: string;
}

interface step1Data {
  photos: Array<any>;
}

interface step2Data {
  address: any;
  telephone: any;
  website: string;
  opening_hours: Array<any>;
}
interface step3Data {
  stories: Array<any>;
}
export interface LocationFormState {
  step: number;
  headerFilled: boolean;
  step2Filled: boolean;
  header: headerData;
  step1: step1Data;
  step2: step2Data;
  step3: step3Data;
}

interface ClearNewLocationForm {
  type: typeof CLEAR_NEW_LOCATION_FORM;
}

interface fillHeaderAction {
  type: typeof FILL_HEADER_INPUT;
  payload: {
    header: headerData;
    isFilled: boolean;
  };
}

interface FillStep2 {
  type: typeof FILL_STEP_2;
  payload: {
    step2: step2Data;
    isFilled: boolean;
  };
}

interface UploadCafePhoto {
  type: typeof UPLOAD_CAFE_PHOTO;
  payload: any;
}
interface RemoveCafePhoto {
  type: typeof REMOVE_CAFE_PHOTO;
  payload: any;
}

interface UploadCafeStory {
  type: typeof UPLOAD_CAFE_STORY;
  payload: any;
}
interface RemoveCafeStory {
  type: typeof REMOVE_CAFE_STORY;
  payload: any;
}

export type Param = { step1: step1Data; step2: step2Data };
export type LocationParam = { step1: step1Data };

export type LocationFormActionTypes =
  | fillHeaderAction
  | UploadCafePhoto
  | RemoveCafePhoto
  | FillStep2
  | UploadCafeStory
  | RemoveCafeStory
  | ClearNewLocationForm;
