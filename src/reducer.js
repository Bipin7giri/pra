/** @format */

import { GET_USERS_SUCCESS } from './actions';

const myFirstReducer = (
  state = {
    users: [],
  },
  actions,
) => {
  switch (actions.type) {
    case GET_USERS_SUCCESS:
      return { ...state, users: actions.users };
    default:
      return state;
  }
};
export default myFirstReducer;
