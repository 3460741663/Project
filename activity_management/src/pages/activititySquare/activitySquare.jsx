import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getActivityList } from './action'
import styles from './activitySquare.css';
import withStyles from '../../withStyles';
import MenuContain from './MenuContain'
import { Button, PullToRefresh, Toast, ListView, SearchBar } from 'antd-mobile'
import { Link } from 'react-router-dom';


class activitySquare extends Component {
  constructor(props){
    super(props);
    this.props.getActivityList();
  }
  getDate() {
    // 修改page的值
    let temp = this.props.params;
    // console.log(this.props.params.page);
    temp.page = this.props.params.page !== 0 ? temp.page + 1 : 1;
    this.props.changeParams(temp);
    // 发出请求
    // console.log(this.props, '我要发请求了')
    this.props.getActivityList(this.props.params);
  }
  render() {
    // const parentRef = React.createRef();
    const menu = React.createRef;
    const { activityList } = this.props
    const position = [7, 26, 48, 67, 89, 108, 129, 150, 171, 191, 211];
    return (
      <div className={styles.contain}>
        <div><img src="./image/posters.jpg" className={styles.poster} alt="" /></div>
        <SearchBar placeholder="本校活动" maxLength={8} />
        <div className={styles.acitivityContain}>
          <MenuContain />
          <div className={styles.activityList}
          >
            <PullToRefresh
              damping={60}
              direction='down'
              // refreshing='true'
              onRefresh={() => {
                // console.log(menu)
                // console.log('加载更多的数据！');
                this.getDate();
              }}
            >
              {
                activityList && activityList.map((item, index) => {
                  return (
                    <Link to={{pathname: '/activityDetail', param:item}} key={index}>
                      <div className={styles.activtyItem}>
                        <div className={styles.textContain}>
                          <div className={styles.name}><span><span>【{item.community_name}】</span>{item.name}</span></div>
                          <div className={styles.time}><span>{item.start_time}&nbsp;&nbsp;&nbsp;&nbsp;{item.position}</span></div>
                          <div className={styles.point}><span>{item.point}</span></div>
                        </div>
                        <div className={styles.imgContain}>
                          <img className={styles.img} style={{ top: `-${position[item.img]}vh` }} src="./image/LOGO.png" alt="" />
                        </div>
                      </div>
                    </Link>
                  )
                })
              }
            </PullToRefresh>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getActivityList: (params) => {
      dispatch(getActivityList(params))
    },
    changeParams: (params) => {
      dispatch({
        type: 'UPDATA_PARAMS',
        params: params
      })
    }
  }
}
const mapStateToProps = (state) => {
  return {
    activityList: state.activityReducer.activity,
    params: state.activityReducer.params
  }
}
const activitysquare = connect(mapStateToProps, mapDispatchToProps)(withStyles(activitySquare, styles));

activitysquare.loadData = (store) => {
  return store.dispatch(getActivityList())
};
export default activitysquare;