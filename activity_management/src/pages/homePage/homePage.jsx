import React, { Component } from 'react';
import styles from './homePage.css';
import withStyles from '../../withStyles'

class HomePage extends Component {
  componentWillMount() {
    if (this.props.staticContext) {
      this.props.staticContext.css.push(styles._getCss());
    }
  }
  render() { 
    return ( 
      <div className={styles.contain}>
        homePage
        <div className={styles.div}>top</div>
        <div className={styles.div}>bottom</div>
      </div>
     );
  }
}
 
export default withStyles(HomePage, styles);