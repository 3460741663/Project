import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getActivityList } from './action'
import styles from './activitySquare.css';
import { Button } from 'antd';
import withStyles from '../../withStyles';
import Menu from './MenuContain'


class activitySquare extends Component {
  componentWillMount() {
    this.props.getActivityList();
  }
  render() {
    const { activityList } = this.props
    return ( 
      <div className={styles.contain}>
        <div><img src="./image/posters.jpg"  className={styles.poster} alt=""/></div>
        <div className={styles.text}><text>本校活动</text></div>
        <div className={styles.acitivityContain}>
          <Menu />
          <div className={styles.activityList}>
            {
              activityList && activityList.map((item, index) => {
                return (
                  <div className={styles.activtyItem} key={index}>
                    <div>
                      <span><span>【{item.community_name}】</span>{item.name}</span>
                      <span>{item.start_time}</span>
                      <span>{item.point}</span>
                    </div>
                    <img className={styles.img} src="./image/logo.jpg" alt=""/>
                  </div>
                )
              })
            }
          </div>
        </div>
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