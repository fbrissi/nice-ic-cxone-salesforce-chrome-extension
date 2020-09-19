import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  setMessages: ['messages'],
});

const INITIAL_STATE = [];

export const set = (state = INITIAL_STATE, action) => action.messages || state;

export default createReducer(INITIAL_STATE, {
  [Types.SET_MESSAGES]: set,
});
