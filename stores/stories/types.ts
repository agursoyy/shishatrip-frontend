export const FETCH_VISITED_LOCAL_STORIES_REQUEST = 'FETCH_VISITED_LOCAL_STORIES_REQUEST';
export const FETCH_VISITED_LOCAL_STORIES_SUCCESS = 'FETCH_VISITED_LOCAL_STORIES_SUCCESS';
export const FETCH_VISITED_LOCAL_STORIES_FAILED = 'FETCH_VISITED_LOCAL_STORIES_FAILED';

export interface IStoryState {
  loading: boolean;
  visitedLocalStories: any;
  stories: any;
  error: boolean;
}

interface fetchVisitedStoriesRequestAction {
  type: typeof FETCH_VISITED_LOCAL_STORIES_REQUEST;
}
interface fetchVisitedStoriesSuccess {
  type: typeof FETCH_VISITED_LOCAL_STORIES_SUCCESS;
  payload: any;
}
interface fetchVisitedStoriesFailed {
  type: typeof FETCH_VISITED_LOCAL_STORIES_FAILED;
}
export type StoryActionTypes =
  | fetchVisitedStoriesRequestAction
  | fetchVisitedStoriesSuccess
  | fetchVisitedStoriesFailed;
