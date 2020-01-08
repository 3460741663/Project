import { createStore } from 'redux'
import { combineReducers } from './reducer'
export default store = () => {
  return createStore(combineReducers)
}