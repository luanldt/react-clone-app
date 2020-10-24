import card from './card';
import auth from './auth';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  card,
  auth,
});

export default rootReducer;
