import React, { Component } from 'react';
import { Tabs, Icon } from 'antd';
import styles from './Home.css';
import HomePage from '../homePage/homePage'
import withStyles from '../../withStyles'

class Home extends Component {
  componentWillMount() {
    if (this.props.staticContext) {
      this.props.staticContext.css.push(styles._getCss());
    }
  }
  render() {
    const { TabPane } = Tabs;
    return (
      <div>
        <Tabs defaultActiveKey="1" size="small  " tabPosition="bottom">
          <TabPane tab={<div className={styles.iconContain}><img src="./image/icon/shouye2.png" className={styles.icon} alt="" /><span>首页</span></div>} key="1" forceRender >
            <HomePage {...this.props} />
          </TabPane>
          <TabPane  tab={<div className={styles.iconContain}><img src="./image/icon/huodong2.png" className={styles.icon} alt="" /><span>活动</span></div>} key="2" forceRender >
            <HomePage {...this.props} />
          </TabPane>
          <TabPane tab={<div className={styles.iconContain}><img src="./image/icon/dongtai2.png" className={styles.icon} alt="" /><span>动态</span></div>} key="3" forceRender >
            <HomePage {...this.props} />
          </TabPane>
          <TabPane tab={<div className={styles.iconContain}><img src="./image/icon/wode2.png" className={styles.icon} alt="" /><span>我的</span></div>} key="4" forceRender >
            <HomePage {...this.props} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Home;