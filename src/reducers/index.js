import card from './card';
import auth from './auth';
import list from './list';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  list,
  card,
  auth,
});

export default rootReducer;
