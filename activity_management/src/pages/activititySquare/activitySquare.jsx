import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getActivityList } from './action'
import styles from './activitySquare.css';
import withStyles from '../../withStyles';
import Menu from './MenuContain'


class activitySquare extends Component {
  componentWillMount() {
    this.props.getActivityList();
  }
  render() {
    const { activityList } = this.props
    const position = [7, 26, 48, 67, 89, 108, 129, 150, 171, 191, 211]
    return ( 
      <div className={styles.contain}>
        <div><img src="./image/posters.jpg"  className={styles.poster} alt=""/></div>
        <div className={styles.text}><span>本校活动</span></div>
        <div className={styles.acitivityContain}>
          <Menu />
          
          <div className={styles.activityList}>
            {
                activityList && activityList.map((item, index) => {
                return (
                  <div className={styles.activtyItem} key={index}>
                    <div className={styles.textContain}>
                      <div className={styles.name}><span><span>【{item.community_name}】</span>{item.name}</span></div>
                        <div className={styles.time}><span>{item.start_time}&nbsp;&nbsp;&nbsp;&nbsp;{item.position}</span></div>
                      <div className={styles.point}><span>{item.point}</span></div>
                    </div>
                    <div className={styles.imgContain}>
                      <img className={styles.img} style={{top:`-${position[item.img]}vh`}} src="./image/LOGO.png" alt=""/>
                    </div>
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