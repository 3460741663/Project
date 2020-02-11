import { Related } from '../../../http/index'
export const getRelatedAffairs = function (params) {
  return (dispatch) => {
    return Related(params).then(res => {
      dispatch({
        type: 'RELETED_AFFAIRS',
        relatedAffairs: res.data
      })
    })
  }
}