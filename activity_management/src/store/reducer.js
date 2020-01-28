import { combineReducers } from 'redux'
import { activityReducer } from '../pages/activititySquare/activityListReducer'
import { userReducer } from '../pages/Login/userReducer'
export const reduce = combineReducers({
  activityReducer:activityReducer,
  userReducer:userReducer
})