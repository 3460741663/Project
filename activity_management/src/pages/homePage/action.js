// import axios from 'axios'
import { GetNews } from '../../../http/index'
export const getNews = function () {
  console.log('我去找新闻数据咯！')
  return (dispatch) => {
    return GetNews().then(res => {
      dispatch({
        type: 'GET_NEWS',
        news: res.data
      })
    })
  }
}