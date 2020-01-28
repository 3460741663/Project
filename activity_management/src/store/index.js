import { createStore } from 'redux'
import { reduce } from './reducer'
export const store = () => {
  return createStore(reduce)
}