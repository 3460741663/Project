import constant from '../../store/constant'
const defaultState = {
  activity: []
};
export default (state = defaultState, actions) => {
  switch(actions.type){
    case constant.ADD_ACTIVITY:
      return { ... state, activity:actions.activity };
    case constant.REMOVE_ACTIVITY:
      return { ... state, activity:actions.activity };
    default: return state
  }
}