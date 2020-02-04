import React, { Component } from 'react';
import styles from './HomePage.css';
import Menu from '../activititySquare/MenuContain'

class HomePage extends Component {
  componentWillMount() {
    if (this.props.staticContext) {
      this.props.staticContext.css.push(styles._getCss());
    }
  }
  render() { 
    return ( 
      <div className={styles.contain}>
        <div><img src="./image/posters.jpg"  className={styles.poster} alt=""/></div>
        <div><text className={styles.text}>本校活动</text></div>
        <div className={styles.acitivityContain}>
          <Menu />
          <div className={styles.activityList}>
            123
          </div>
        </div>
        

      </div>
     );
  }
}
 
export default HomePage;