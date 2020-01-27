import React, { Component } from 'react';
import InputBox from '../../components/InputBox'
import styles from './Login.css'
import widthStyles from '../../withStyles'
import { Icon } from 'antd'
class Login extends Component {
  render() {
    const form = {};
    return (
      <div className={styles.contain}>
        <div><img src="./image/logo.jpg" className={styles.logo} alt=""/></div>
        <div className={styles.InputBox}><InputBox form={form}/></div>
        <div className={styles.quickLogin}>
          <Icon className={styles.icon} type="qq" />
          <Icon className={styles.icon} type="wechat" />
          <Icon className={styles.icon} type="weibo" /></div>
      </div>
    );
  }
}

export default widthStyles(Login, styles);