/** @format */

export const GET_USERS_FETCH = 'GET_USERS_FETCH';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_POST_FETCH = 'GET_POST_FETCH';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';

export const getUserFetch = () => ({
  type: GET_USERS_FETCH,
});

export const getPostFetch = () => ({
  type: GET_POST_FETCH,
});
