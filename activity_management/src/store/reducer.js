import { combineReducers } from 'redux'
import { activityReducer } from '../pages/activititySquare/activityListReducer'
import { userReducer } from '../pages/Login/userReducer'
import { relatedAffairsReducer } from '../pages/dynamic/relatedAffairsReducer'
export const reduce = combineReducers({
  activityReducer:activityReducer,
  userReducer:userReducer,
  relatedAffairsReducer: relatedAffairsReducer
})