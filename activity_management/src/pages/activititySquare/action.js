import { getActivity } from '../../../http/index'
export const getActivityList = function (params) {
  return (dispatch) => {
    return getActivity(params).then(res => {
      dispatch({
        type: 'ACtIVITY_LIST',
        activity: res.data
      })
    })
  }
}