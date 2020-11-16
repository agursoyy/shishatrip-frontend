import {
  FETCH_VISITED_LOCAL_STORIES_REQUEST,
  FETCH_VISITED_LOCAL_STORIES_SUCCESS,
  FETCH_VISITED_LOCAL_STORIES_FAILED,
} from './types';
import { RootState } from '../index';
import getConfig from 'next/config';
const {
  publicRuntimeConfig: { api },
} = getConfig();
import Axios from 'axios';
import queryString from 'query-string';
import ILocationListQuery from '../../interfaces/locationListQuery';
import Router from 'next/router';
import { SUCCESS } from '../alert/types';
import { error, success } from '../alert/actions';
import fetch from '../api';
import { func } from 'prop-types';

export function fetchVisitedLocalStories(localId: number) {
  return async (dispatch: any, getState: () => RootState) => {
    // redux thunk.
    const {
      stories: { visitedLocalStories },
    } = getState();
    const form = {
      local_id: localId,
    };
    try {
      dispatch({ type: FETCH_VISITED_LOCAL_STORIES_REQUEST });
      const { status, data } = await fetch({ url: `/story`, auth: false, form });
      dispatch({ type: FETCH_VISITED_LOCAL_STORIES_SUCCESS, payload: data });
    } catch (err) {
      console.log(err);

      dispatch({ type: FETCH_VISITED_LOCAL_STORIES_FAILED });
      dispatch(error('Something went wrong...'));
    }
  };
}

var timestamp = function () {
  var timeIndex = 0;
  var shifts = [35, 60, 60 * 3, 60 * 60 * 2, 60 * 60 * 25, 60 * 60 * 24 * 4, 60 * 60 * 24 * 10];

  var now = new Date();
  var shift = shifts[timeIndex++] || 0;
  var date = new Date((now as any) - shift * 1000);

  return date.getTime() / 1000;
};

export const generate_stories_format = (visitedLocalStories: any, visitedData: any) => {
  const storyArray = [
    [visitedData.name, visitedData.logo_img, visitedData.name, 'https://ramon.codes', timestamp()],
  ];
  let stories = [];
  if (visitedLocalStories && visitedLocalStories.length > 0) {
    stories = visitedLocalStories.map((story: any, index: any) => {
      return [
        index,
        'photo',
        3,
        story.url,
        story.url,
        visitedData.website,
        false,
        false,
        timestamp(),
      ];
    });
  }
  storyArray[0].push(stories);
  return storyArray;
};
