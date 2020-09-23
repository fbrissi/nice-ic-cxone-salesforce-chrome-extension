import { combineReducers } from 'redux';
import messages from './messages';
import settings from './settings';

export default combineReducers({
  messages,
  settings,
});
