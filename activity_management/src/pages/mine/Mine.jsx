import React, { Component } from 'react';
import { Grid } from 'antd-mobile';
import styles from './Mine.css';
import withStyles from '../../withStyles'

class Mine extends Component {
  render() {
    const data = Array.from(new Array(3)).map((_val, i) => ({
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
      text: `name${i}`,
    }));
    const data1 = Array.from(new Array(8)).map((_val, i) => ({
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
      text: `name${i}`,
    }));
    return (
      <div className={styles.contain}>
          <div>head</div>
          <div>
            <div className="sub-title">我的财富</div>
            <Grid data={data} hasLine={false} />
          </div>
          <div>
            <div className="sub-title">我的AM</div>
            <Grid data={data1} hasLine={false} />
          </div>
          <div>
            <div className="sub-title">我的职场</div>
            <Grid data={data} hasLine={false} />
          </div>

      </div>
    );
  }
}

export default withStyles(Mine, styles);