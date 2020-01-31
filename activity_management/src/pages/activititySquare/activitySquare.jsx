import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getActivityList } from './action'
import styles from './activitySquare.css';
import { Button } from 'antd';
import withStyles from '../../withStyles'

class activitySquare extends Component {
  componentDidMount() {
    this.props.getActivityList();
  }
  render() {
    const { activityList } = this.props
    return ( 
      <div>
        <Button type="primary">Primary</Button>
        <a className={styles.header}>css实验处</a>
        <ul>
        {
          activityList && activityList.map((item, index) => {
            return (
              <li key={index}>{item.name}</li>
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