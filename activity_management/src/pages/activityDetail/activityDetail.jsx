import React, { Component } from 'react';
import styles from './activityDetail.css';
import { Card, WhiteSpace, Steps, WingBlank, Tabs, Badge } from 'antd-mobile';
import { Icon } from 'antd';
// import WithStyles from '../../withStyles'
import withStyles from '../../withStyles';
import { Link } from 'react-router-dom';

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
    const data = {
      type_name: '体育运动',
      img: '9',
      type_ID: '9',
      community_name: '篮球社',
      description: '为了发展我校大学生的体育运动，促进爱好台球竞技的新生之间的友谊，增进同学们对台球精神的认识和理解，以及推广这项富有趣味性、益智信的运动项目，故举办此次新生杯台球赛。',
      point: '5.0',
      duration: '120',
      start_time: '2019-11-22',
      community_ID: '4',
      user_ID: '1',
      name: '软件学院篮球杯决赛',
      ID: '9',
      position: '翼珍楼',
      status: '3'
    }
    const title = `【${data.community_name}】${data.name}`
    return (
      <div className={styles.contain}>
        {/* <Link to='/home'>去home页面</Link> */}
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
                title={title}
                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
              >
              </Card.Header>
              <Card.Body>
                <span className={styles.point}>{data.point}</span>
                <div>活动时间&nbsp;&nbsp;{data.start_time}</div>
              </Card.Body>
              <Card.Footer content={data.position} />
            </Card>
          </div>

          <div className={styles.step}>
            <Steps current={2} direction="horizontal" size="small">{steps}</Steps>
          </div>

          <div className={styles.slide}>
            <Tabs tabs={tabs} initialPage={1}>
              <div style={{ padding: '5vw', display: 'flex', alignItems: 'left', justifyContent: 'center', height: '30vh', backgroundColor: '#fff', justifyContent: 'space-between', flexFlow: 'column' }}>
                <span>活动分类: &nbsp;&nbsp;&nbsp;&nbsp;{data.type_name}</span>
                <span>所属组织: &nbsp;&nbsp;&nbsp;&nbsp;{data.community_name}</span>
                <span>活动年级: &nbsp;&nbsp;&nbsp;&nbsp;2019级&nbsp;2018级&nbsp;2017级</span>
                <span>联系方式: &nbsp;&nbsp;&nbsp;&nbsp;邹声达 18770869179</span>
                <span>活动院系: &nbsp;&nbsp;&nbsp;&nbsp;全体学生</span>
              </div>
              <div style={{ padding: '5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30vh', backgroundColor: '#fff' }}>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.description}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30vh', backgroundColor: '#fff' }}>
                暂无评价
            </div>
            </Tabs>
            <WhiteSpace />
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.like}><Icon type="star" />收藏</div>
          <div className={styles.status}>
            我要报名
              {/* 报名/等待签到/已签到/已结束 */}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(ActivityDetail, styles);