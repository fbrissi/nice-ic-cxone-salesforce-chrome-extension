import { createActions, createReducer } from 'reduxsauce';

export const KEY = '@salesforce@plugin@to@familysearch';

export const { Types, Creators } = createActions({
  setMessages: ['messages'],
});

const INITIAL_STATE = JSON.parse(localStorage.getItem(KEY) || '[]');

export const set = (state = INITIAL_STATE, action) => {
  const value = action.messages || state;
  localStorage.setItem(KEY, JSON.stringify(value));
  return value;
};

export default createReducer(INITIAL_STATE, {
  [Types.SET_MESSAGES]: set,
});
