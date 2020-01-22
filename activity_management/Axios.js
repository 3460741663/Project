// export const getActivityList = function() {
//   return (dispatch) => {
//     return axios.get('http://localhost:3003/mapi/comment').then(res => {
//       const data = res.data.list;
//       console.log(data);
//       dispatch({
//         type: 'ACtIVITY_LIST',
//         activity: data
//       })
//     })
//   }
// }
const axios = require('axios');
 
// Make a request for a user with a given ID
axios.get('localhost:8090/activity_management/getActivityList?page=1')
  .then(function (response) {
    // handle success
    console.log(response);
  })
var str = '[{duration=120, start_time=2019-12-19, community_ID=2, user_ID=3, type_ID=4, name=history, ID=1, point=2.0, status=7}, {duration=120, start_time=2019-12-19, community_ID=5, user_ID=22, type_ID=1, name=ActiveList, ID=11, point=1.5, status=2}, {duration=120, start_time=2019-12-12, community_ID=3, user_ID=22, type_ID=4, name=ActiveList, ID=2, point=2.0, status=1}, {duration=120, start_time=2019-12-06, community_ID=2, user_ID=4, type_ID=1, name=ActiveList, ID=8, point=2.0, status=2}, {duration=120, start_time=2019-12-06, community_ID=3, user_ID=21, type_ID=1, name=ActiveList, ID=6, point=3.0, status=1}, {duration=60, start_time=2019-12-06, community_ID=4, user_ID=24, type_ID=1, name=ActiveList, ID=4, point=4.0, status=2}, {duration=120, start_time=2019-11-22, community_ID=3, user_ID=21, type_ID=1, name=ActiveList, ID=9, point=5.0, status=3}]'
var reg = /([\w-.]+)/g;
var temp = str.replace(reg, '"$1"')
var result = temp.replace(/=/g, ":")
console.log(JSON.parse(result));