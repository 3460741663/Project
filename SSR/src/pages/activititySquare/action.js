import axios from 'axios'

export const getActivityList = function() {
  return (dispatch) => {
    return axios.get('http://localhost:3003/mapi/comment').then(res => {
      const data = res.data.list;
      console.log(data);
      dispatch({
        type: 'ACtIVITY_LIST',
        activity: data
      })
    })
  }
}