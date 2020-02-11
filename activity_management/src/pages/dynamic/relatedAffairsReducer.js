import constant from '../../store/constant'
const defaultState = [];
export const relatedAffairsReducer = (state = defaultState, actions) => {
  switch(actions.type){
    case constant.RELETED_AFFAIRS:
      return { ...state, relatedAffairs:actions.relatedAffairs}
    default: return state
  }
}