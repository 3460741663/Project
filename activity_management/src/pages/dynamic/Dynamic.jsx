import React, { Component } from 'react';
import styles from './Dynamic.css';
import TimeLine from './TimeLine'
import withStyles from '../../withStyles'

class Dynamic extends Component {
  render() { 
    return ( 
      <div className={styles.contain}>
        {/* 个人动态 */}
        <TimeLine {...this.props} />
      </div>
     );
  }
}
 
export default withStyles(Dynamic, styles);