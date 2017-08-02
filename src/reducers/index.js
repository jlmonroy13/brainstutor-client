import { combineReducers } from 'redux';
import userInfo from './authentication';
import teachers from './teachers';
import dashboard from './dashboard';
import chat from './chat';
import scheduleTutor from './scheduleTutor';
import header from './header';
import openTokSession from './openTokSession';
import { routerReducer } from 'react-router-redux';
import { pendingTasksReducer as pendingTasks } from 'react-redux-spinner';


const rootReducer = combineReducers({
  userInfo,
  teachers,
  dashboard,
  routing: routerReducer,
  pendingTasks,
  scheduleTutor,
  openTokSession,
  chat,
  header,
});

export default rootReducer;
