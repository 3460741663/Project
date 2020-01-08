import { combineReducers } from 'redux'
import * as activityReducer from '../pages/activititySquare/activityListReducer'
export default combineReducers({
  activityReducer: activityReducer
})