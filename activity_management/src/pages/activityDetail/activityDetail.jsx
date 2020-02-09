import React, { Component } from 'react';
import { Card, WhiteSpace, Steps, WingBlank, Tabs, Badge } from 'antd-mobile'
class ActivityDetail extends Component {

  render() {
    const Step = Steps.Step;
    const steps = [{
      title: '报名',
      description: '未报名',
    }, {
      title: '签到',
      description: '等待签到',
    }, {
      title: '结束',
      description: '活动结束',
    }].map((s, i) => <Step key={i} title={s.title} description={s.description} />);
    const customIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" className="am-icon am-icon-md">
        <g fillRule="evenodd" stroke="transparent" strokeWidth="4">
          <path d="M21 0C9.402 0 0 9.402 0 21c0 11.6 9.402 21 21 21s21-9.4 21-21C42 9.402 32.598 0 21 0z" />
          <path fill="#FFF" d="M29 18.73c0-.55-.447-1-1-1H23.36l4.428-5.05c.407-.46.407-1.208 0-1.668-.407-.46-1.068-.46-1.476 0l-5.21 5.89-5.21-5.89c-.406-.46-1.067-.46-1.475 0-.406.46-.406 1.207 0 1.667l4.43 5.05H14.23c-.55 0-.998.45-.998 1 0 .554.448.97 1 .97h5.9v3.942h-5.9c-.552 0-1 .448-1 1s.448.985 1 .985h5.9v4.896c0 .552.448 1 1 1 .55 0 .968-.284.968-.836v-5.06H28c.553 0 1-.433 1-.985s-.447-1-1-1h-5.9v-3.94H28c.553 0 1-.418 1-.97z" />
        </g>
      </svg>
    );
    const tabs = [
      { title: '信息' },
      { title: '详情' },
      { title: '评价' },
    ];
    return (
      <div>
        <WhiteSpace size="lg" />
        <Card full>
          <Card.Header
            title='【校实践部】2020"创青春赛事专场答疑"'
            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
          // extra={<span>this is extra</span>}
          />
          <Card.Body>
            <div>活动 2019/12/13 ~ 2019/12/31</div>
          </Card.Body>
          <Card.Footer content="蛟桥园南区201/麦庐园图文信息楼六楼" />
        </Card>

        <WingBlank mode={20} className="stepsExample">
          <WhiteSpace />
          <Steps current={2} direction="horizontal" size="small">{steps}</Steps>
        </WingBlank>


        <div>
          <Tabs tabs={tabs}
            initialPage={1}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
              Content of first tab
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
              Content of second tab
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
              Content of third tab
            </div>
          </Tabs>
          <WhiteSpace />
        </div>
        <div>
        <div>收藏</div>
        <div>报名/等待签到/已签到/已结束</div>
      </div>
      </div>
    );
  }
}

export default ActivityDetail;