import { combineReducers } from 'redux'
import * as activityReducer from '../pages/activitiesSquare/activityListReducer'
export default combineReducers({
  activityReducer: activityReducer
})