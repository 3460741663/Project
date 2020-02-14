import constant from '../../store/constant'
const defaultState = {
  activity:[],
  params:{
    page:0,
    type:0,
    status:0,
    belongs:0,
    order:0
  }
};
export const activityReducer = (state = defaultState, actions) => {
  switch(actions.type){
    case constant.ACtIVITY_LIST:
      // return state.activity.push(actions.activity);
      return { ... state, activity:actions.activity };
    case constant.REMOVE_ACTIVITY:
      return { ... state, activity:actions.activity };
    case 'GET_NEWS':
      return { ...state, news:actions.news}
    case constant.UPDATA_PARAMS:
      return { ...state, params:actions.params}
    default: return state
  }
}