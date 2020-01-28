import constant from '../../store/constant'
const defaultState = {};
export const userReducer = (state = defaultState, actions) => {
  switch(actions.type){
    case constant.LOGIN:
      return { ...state, user:actions.user };
    default: return state
  }
}