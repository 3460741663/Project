import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getActivityList } from './action'
import styles from './activitySquare.css';
import { Button } from 'antd';
import withStyles from '../../withStyles'

class activitySquare extends Component {
  componentWillMount() {
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
const activitysquare = connect(mapStateToProps, mapDispatchToProps)(withStyles(activitySquare, styles));

activitysquare.loadData = (store) => {
  return store.dispatch(getActivityList())
};
export default activitysquare;