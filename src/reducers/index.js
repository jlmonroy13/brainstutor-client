import { combineReducers } from 'redux';
import userInfo from './authentication';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  userInfo,
  routing: routerReducer
});

export default rootReducer;
