import {
  LocationFormState,
  LocationFormActionTypes,
  CLEAR_NEW_LOCATION_FORM,
  FILL_HEADER_INPUT,
  UPLOAD_CAFE_PHOTO,
  REMOVE_CAFE_PHOTO,
  UPLOAD_CAFE_STORY,
  REMOVE_CAFE_STORY,
  FILL_STEP_2,
} from './types';

const initialState: LocationFormState = {
  step: 1,
  headerFilled: false,
  step2Filled: false,
  header: {
    logo_img: '',
    name: '',
    category_id: -1,
    cafe_address: '',
  },
  step1: {
    photos: [],
  },
  step2: {
    address: '',
    telephone: '',
    website: '',
    opening_hours: [],
  },
  step3: {
    stories: [],
  },
};

export function locationFormReducer(
  state = initialState,
  action: LocationFormActionTypes, // AuthActionTypes
): LocationFormState {
  switch (action.type) {
    case FILL_HEADER_INPUT:
      return {
        ...state,
        header: { ...state.header, ...action.payload.header },
        headerFilled: action.payload.isFilled,
      };
    case UPLOAD_CAFE_PHOTO:
      return { ...state, step1: { photos: [...state.step1.photos, action.payload] } };
    case REMOVE_CAFE_PHOTO:
      return { ...state, step1: { photos: action.payload } };
    case FILL_STEP_2:
      return {
        ...state,
        step2: { ...state.step2, ...action.payload.step2 },
        step2Filled: action.payload.isFilled,
      };
    case UPLOAD_CAFE_STORY:
      return { ...state, step3: { stories: [...state.step3.stories, action.payload] } };
    case REMOVE_CAFE_STORY:
      return { ...state, step3: { stories: action.payload } };
    case CLEAR_NEW_LOCATION_FORM:
      return { ...initialState, step: 3 };
    default:
      return state;
  }
}
