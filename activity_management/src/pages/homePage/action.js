import axios from 'axios'
export const getNews = function () {
  console.log('我去找新闻数据咯！')
  return (dispatch) => {
    return axios.get('http://localhost:3003/mapi/comment').then(res => {
      dispatch({
        type: 'GET_NEWS',
        news: res.data
      })
    })
  }
}