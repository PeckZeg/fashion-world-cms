import { combineReducers } from 'redux';

import layout from './layout';
import my from './my';

export default combineReducers({
  my,
  layout
});
