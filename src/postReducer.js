/** @format */

import { GET_POST_SUCCESS } from './actions';

const postReducer = (
  state = {
    posts: [],
  },
  actions,
) => {
  switch (actions.type) {
    case GET_POST_SUCCESS:
      return { ...state, posts: actions.posts };
    default:
      return state;
  }
};
export default postReducer;
