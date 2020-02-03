import { Tabs, Icon } from 'antd';

const { TabPane } = Tabs;

ReactDOM.render(
  <Tabs defaultActiveKey="1" size="small">
    <TabPane tab={ <span>首页</span> } key="1" forceRender >
      Tab 1
    </TabPane>
    <TabPane tab={ <span>活动</span>} key="2" forceRender >
      Tab 2
    </TabPane>
    <TabPane tab={ <span>我的</span>} key="3" forceRender >
      Tab 3
    </TabPane>
  </Tabs>
);