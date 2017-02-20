import { combineReducers } from 'redux';
import userInfo from './authentication';
import { routerReducer } from 'react-router-redux';
import { pendingTasksReducer as pendingTasks } from 'react-redux-spinner';


const rootReducer = combineReducers({
  userInfo,
  routing: routerReducer,
  pendingTasks,
});

export default rootReducer;
