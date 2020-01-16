import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getActivityList } from './action'

class activitySquare extends Component {
  componentDidMount() {
    this.props.getActivityList();
  }
  render() {
    const { activityList } = this.props
    console.log(activityList);
    return ( 
      <div>   
        <h1>活动列表</h1>
        <ul>
        {
          activityList && activityList.map((item, index) => {
            return (
              <li key={index}>{item.content}</li>
            )
          })
        }
        </ul>
      </div>
     );
  }
}
activitySquare.loadData = function(store) {
  return  store.dispatch(getActivityList())
}
const mapDispatchToProps = (dispatch) => {
  return {
    getActivityList: () => {
      dispatch(getActivityList())
    }
  }
}
const mapStateToProps = (state) => {
  return {
    activityList: state.activityReducer.activity
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(activitySquare);