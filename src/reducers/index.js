import { combineReducers } from 'redux';
import userInfo from './authentication';
import teachers from './teachers';
import scheduleTutor from './scheduleTutor';
import openTokSession from './openTokSession';
import { routerReducer } from 'react-router-redux';
import { pendingTasksReducer as pendingTasks } from 'react-redux-spinner';


const rootReducer = combineReducers({
  userInfo,
  teachers,
  routing: routerReducer,
  pendingTasks,
  scheduleTutor,
  openTokSession,
});

export default rootReducer;
