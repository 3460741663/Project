import React, { Component } from 'react';
import { connect } from 'react-redux'

class activitySquare extends Component {
  render() { 
    const { activityList } = this.props
    console.log(activityList)
    return ( 
      <div>
        <ul>
          {
            activityList.map((item, index) => {
            return <li key={index}>{item.name}</li>
            })
          }
        </ul>
      </div>
     );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getCommentList: () => {
      dispatch(getCommentList())
    }
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    activityList: state.activityReducer.activity
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(activitySquare);