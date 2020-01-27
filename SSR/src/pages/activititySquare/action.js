import axios from 'axios'
import { getActivity } from '../../../http/index'
export const getActivityList = function () {
  return (dispatch) => {
    return getActivity().then(res => {
      dispatch({
        type: 'ACtIVITY_LIST',
        activity: res.data
      })
    })
  }
}