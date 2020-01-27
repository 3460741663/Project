import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getActivityList } from './action'
import styles from './activitySquare.css';
import { Button } from 'antd';
import withStyles from '../../withStyles'

class activitySquare extends Component {
  componentWillMount() {
    this.props.getActivityList();
    //判断是否为服务端渲染环境
    if (this.props.staticContext) {
      this.props.staticContext.css.push(styles._getCss())
    }
    // console.log(this.props);
    // if (this.props.staticContext) {
    //   console.log("*************", '一个CSS被加载！', "________________")
    //   this.props.staticContext.css.push(styles._getCss());
    // }
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
// export default connect(mapStateToProps, mapDispatchToProps)(activitySquare);
const activitysquare = connect(mapStateToProps, mapDispatchToProps)(withStyles(activitySquare, styles));

activitysquare.loadData = (store) => {
  return store.dispatch(getActivityList())
};
export default activitysquare;