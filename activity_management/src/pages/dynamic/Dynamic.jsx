import React, { Component } from 'react';
import styles from './Dynamic.css';
import TimeLine from './TimeLine';
import { connect } from 'react-redux'
import withStyles from '../../withStyles';
import { getRelatedAffairs } from './action'
import { Button } from 'antd-mobile';

class Dynamic extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.getRelatedAffairs({user_ID:1});
  }
  render() { 
    const data = this.props.relatedAffairs ? this.props.relatedAffairs : []
    return ( 
      <div className={styles.contain}>
        {/* 个人动态 */}
        <TimeLine data={data} {...this.props} />
      </div>
     );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getRelatedAffairs: (params) => {
      dispatch(getRelatedAffairs(params))
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    relatedAffairs: state.relatedAffairsReducer.relatedAffairs
  }
}
const DynamicPage = connect(mapStateToProps, mapDispatchToProps)(withStyles(Dynamic, styles));

// 同构store
DynamicPage.loadData = (store) => {
  return store.dispatch(getRelatedAffairs({user_ID:1}))
};
export default DynamicPage;