import constant from '../../store/constant'
const defaultState = {};
export const activityReducer = (state = defaultState, actions) => {
  switch(actions.type){
    case constant.ACtIVITY_LIST:
      return { ... state, activity:actions.activity };
    case constant.REMOVE_ACTIVITY:
      return { ... state, activity:actions.activity };
    default: return state
  }
}