import { createStore, applyMiddleware } from 'redux'
import { reduce } from './reducer'
import thunk from 'redux-thunk'

export const Clientstore = () => {
  // store的默认值，把数据JSON.Stringfy放在了script中
  const defaultStore = window.__context__ || {};
  return createStore(
    reduce,
    defaultStore.state,
    applyMiddleware(thunk));
}
export const  Serverstore = () => {
  return createStore(reduce, applyMiddleware(thunk));
}
