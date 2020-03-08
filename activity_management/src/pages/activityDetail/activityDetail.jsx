import React, { Component } from 'react';
import styles from './activityDetail.css';
import { Card, WhiteSpace, Steps, WingBlank, Tabs, Badge, Toast } from 'antd-mobile';
import { Icon } from 'antd';
import withStyles from '../../withStyles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'


class ActivityDetail extends Component {
  constructor(props){
    super(props);
    this.GetStatus();
    this.state = {
      step:[{title: '报名'}, {title: '签到'}, {title: '结束'}],
      status:0
    }
  }
  GetStatus(){
    if(this.props.user){
      console.log('获取当前用户的这个活动状态')
      // TODO
    }else{
      // 未登录用户
      console.log('我是游客，提示我去登录')
    }
  }
  apply(){
    let temp = this.state;
    temp.status ++;
    this.setState(temp)
    console.log('我帮他报名！')
    // TODO
  }
  sign(){
    let temp = this.state;
    temp.status ++;
    this.setState(temp)
    console.log('我帮他签到')
    // TODO
  }
  render() {
    const Step = Steps.Step;
    const steps = this.state.step.map((s, i) => <Step key={i} title={s.title} description={s.description} />);
    const tabs = [{ title: '信息' },{ title: '详情' },{ title: '评价' }];
    const statu = ['我要报名','我要签到','活动进行中','活动结束']
    const data = this.props.location.param;
    const title = `【${data.community_name}】${data.name}`
    return (
      <div className={styles.contain}>
        {/* <Link to='/home'>去home页面</Link> */}
        <div className={styles.head}>
          <Link to={{ pathname: '/home', tabs: 2 }}><Icon type="left" /></Link>
          <div style={{ width: '85vw', textAlign: 'center' }}>
            <h3>活动详情</h3>
          </div>
          <Icon type="more" />
        </div>
        <div className={styles.content}>
          <div className={styles.card}>
            <Card full>
              <Card.Header
                title={title}
                thumb="./image/icon/huodong.png"
              >
              </Card.Header>
              <Card.Body>
                <span className={styles.point}>{data.point}</span>
                <div>活动时间&nbsp;&nbsp;{data.start_time}</div>
              </Card.Body>
              <Card.Footer content={data.position} />
            </Card>
          </div>
          {/* 进度 */}
          <div className={styles.step}>
            <Steps current={this.state.status} direction="horizontal" size="small">{steps}</Steps>
          </div>
          {/* 详细信息 */}
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
        {/* 底部 */}
        <div className={styles.footer}>
          <div className={styles.like}><Icon type="star" />收藏</div>
          <div className={styles.status} 
            onClick={() => {
              if(!this.props.user) Toast.fail('尚未登录，无法报名 !!!', 1)
              else if(this.state.status == 0) {this.apply(); Toast.success('报名成功 !!!', 1)}
              else if(this.state.status == 1) {this.sign(); Toast.success('签到成功 !!!', 1)}
            }}>
              {statu[this.state.status]}
              {/* 报名/等待签到/已签到/已结束 */}
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // getNews:()=>{
    //   dispatch(getNews())
    // }
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}
// export default withStyles(ActivityDetail, styles);

const activityDetail = connect(mapStateToProps, mapDispatchToProps)(withStyles(ActivityDetail, styles));

activityDetail.loadData = (store) => {
  // return store.dispatch(getNews())
};
export default activityDetail;