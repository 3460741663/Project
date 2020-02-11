import React, { Component } from 'react';
import InputBox from './InputBox'
import styles from './Login.css'
import widthStyles from '../../withStyles'
import { Link } from 'react-router-dom'
import { loginVerify } from '../../../http/index'

class Login extends Component {
  render() {
    const form = {};
    return (
      <div className={styles.contain}>
        <div><img src="./image/school_bg.jpg" className={styles.logo} alt=""/></div>
        <div className={styles.InputBox}><InputBox form={form} verify={loginVerify} {...this.props}/></div>
        <div className={styles.quickLogin}>
          <Link to='/activitySquare'><img src="./image/icon/qq.png" className={styles.icon} alt=""/></Link>
          <Link to='/activitySquare'><img src="./image/icon/weibo.png" className={styles.icon} alt=""/></Link>
          <Link to='/activitySquare'><img src="./image/icon/wechat.png" className={styles.icon} alt=""/></Link>
        </div>
      </div>
    );
  }
}

export default widthStyles(Login, styles);