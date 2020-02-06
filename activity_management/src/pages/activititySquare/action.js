import axios from 'axios'
import { getActivity } from '../../../http/index'
export const getActivityList = function (params) {
  return (dispatch) => {
    return getActivity(params).then(res => {
      // console.log(params)
      dispatch({
        type: 'ACtIVITY_LIST',
        activity: res.data
      })
    })
  }
}