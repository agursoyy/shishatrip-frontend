import { settings } from 'nprogress';
import {
  IStoryState,
  FETCH_VISITED_LOCAL_STORIES_REQUEST,
  FETCH_VISITED_LOCAL_STORIES_SUCCESS,
  FETCH_VISITED_LOCAL_STORIES_FAILED,
  StoryActionTypes,
} from './types';

const initialState: IStoryState = {
  loading: true,
  error: false,
  stories: null,
  visitedLocalStories: null,
};

export function storyReducer(
  state: IStoryState = initialState,
  action: StoryActionTypes,
): IStoryState {
  switch (action.type) {
    case FETCH_VISITED_LOCAL_STORIES_REQUEST:
      return { ...state, loading: true };
    case FETCH_VISITED_LOCAL_STORIES_SUCCESS:
      return { ...state, loading: false, error: false, visitedLocalStories: action.payload };
    case FETCH_VISITED_LOCAL_STORIES_FAILED:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}
