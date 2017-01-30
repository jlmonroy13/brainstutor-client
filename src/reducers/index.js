import { combineReducers } from 'redux';
import authentication from './authentication';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  authentication,
  routing: routerReducer
});

export default rootReducer;
