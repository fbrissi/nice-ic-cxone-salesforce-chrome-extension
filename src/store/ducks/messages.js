import { createActions, createReducer } from 'reduxsauce';

export const KEY = 'familysearch_salesforce_plugin';

export const { Types, Creators } = createActions({
  setMessages: ['messages'],
});

const INITIAL_STATE = JSON.parse(localStorage.getItem(KEY) || '[]');

export const set = (state = INITIAL_STATE, action) => action.messages || state;

export default createReducer(INITIAL_STATE, {
  [Types.SET_MESSAGES]: set,
});
