import constant from '../../store/constant'
const defaultState = {
  activity: [
    {
      id : 1,
      name : '羽毛球比赛',
      point : 1.5
    },
    {
      id : 2,
      name : '街头演讲',
      point : 2
    }
  ]
};
export const activityReducer = (state = defaultState, actions) => {
  switch(actions.type){
    case constant.ACtIVITY_LIST:
      return { ... state, activity:actions.activity };
    case constant.REMOVE_ACTIVITY:
      return { ... state, activity:actions.activity };
    default: return state
  }
}