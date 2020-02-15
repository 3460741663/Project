import React, { Component } from 'react';
import styles from './activityDetail.css';
import { Card, WhiteSpace, Steps, WingBlank, Tabs, Badge } from 'antd-mobile';
import { Icon } from 'antd';

class ActivityDetail extends Component {
  render() {
    const Step = Steps.Step;
    const steps = [{
      title: '报名',
      description: '已报名',
    }, {
      title: '签到',
      description: '签到成功',
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
      <div className={styles.contain}>
        <div className={styles.head}>
          <Icon type="left" />
          <div style={{ width: '85vw', textAlign: 'center' }}>
            <h3>活动详情</h3>
          </div>
          <Icon type="more" />
        </div>
        <div className={styles.content}>
          <div className={styles.card}>
            <Card full>
              {/* <span className={styles.point}>2.0</span> */}
              <Card.Header
                title='【校实践部】2020"创青春fasdfasdfa赛事专场"'
                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
              >
              </Card.Header>
              <Card.Body>
                <span className={styles.point}>2.0</span>
                <div>活动时间 2019/12/13 ~ 2019/12/31</div>
              </Card.Body>
              <Card.Footer content="蛟桥园南区201/麦庐园图文信息楼六楼" />
            </Card>
          </div>

          <div className={styles.step}>
            <Steps current={2} direction="horizontal" size="small">{steps}</Steps>
          </div>

          <div className={styles.slide}>
            <Tabs tabs={tabs} initialPage={1}>
              <div style={{padding: '5vw', display: 'flex', alignItems: 'left', justifyContent: 'center', height: '30vh', backgroundColor: '#fff', justifyContent:'space-between',flexFlow: 'column' }}>
                <span>活动分类: &nbsp;&nbsp;&nbsp;&nbsp;社会实践</span>
                <span>所属组织: &nbsp;&nbsp;&nbsp;&nbsp;国际学院</span>
                <span>活动年级: &nbsp;&nbsp;&nbsp;&nbsp;2019级&nbsp;2018级&nbsp;2017级</span>
                <span>联系方式: &nbsp;&nbsp;&nbsp;&nbsp;邹声达 18770869179</span>
                <span>活动院系: &nbsp;&nbsp;&nbsp;&nbsp;社会实践</span>
            </div>
              <div style={{padding: '5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30vh', backgroundColor: '#fff' }}>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;提高学生积极性与学生的环保意识，增强大家对植物的认识，提高大家对植物的爱护意识，增强大家对绿化环境保护的意识。给我们的城市建设作贡献，给我们的家园增添- -点绿色，使我们的生活环境更加美丽。同时拉动江财支付宝公益林发展，让同学们积极投入到环保行动中，把植树理念、绿色文化宣传到全校师生的心中。</p>
            </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30vh', backgroundColor: '#fff' }}>
                暂无评价
            </div>
            </Tabs>
            <WhiteSpace />
          </div>
        </div>
        <div className={styles.footer}>
            <div className={styles.like}>收藏</div>
            <div className={styles.status}>
              我要报名
              {/* 报名/等待签到/已签到/已结束 */}
            </div>
          </div>
      </div>
    );
  }
}

export default ActivityDetail;