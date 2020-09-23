import { createActions, createReducer } from 'reduxsauce';
import { setSettings } from '../../services/settings';

export const { Types, Creators } = createActions({
  setSettings: ['settings'],
});

const INITIAL_STATE = {};

export const set = (state = INITIAL_STATE, action) => {
  const settings = action.settings || state;
  setSettings(settings);
  return settings;
};

export default createReducer(INITIAL_STATE, {
  [Types.SET_SETTINGS]: set,
});
