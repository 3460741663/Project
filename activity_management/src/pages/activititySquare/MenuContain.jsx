import { Menu, Dropdown, Icon, message } from 'antd';
import React, { Component } from 'react';
import styles from './activitySquare.css';
import { connect } from 'react-redux';
import { getActivityList } from './action'

class MenuContain extends Component {
  constructor(props){
    super(props);
    this.state = {
      param:{},
      tabName:{
        type:'分类',
        status:'状态',
        belongs:'所属组织',
        order:'排序'
      }
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(event) {
    // console.log(event)
    // 修改菜单名字
    let nameCollection = {type:'类别', belongs:'所属组织', status:'状态', order:'排序'};
    let tempName = this.state.tabName;
    // 选择不限给予的反馈
    tempName[event.item.props.name] = event.key !== "0" ? event.item.props.children : nameCollection[event.item.props.name];
    // 修改保存接口请求参数对象
    let temp = this.state.param;
    temp[event.item.props.name] = event.key;
    this.setState({
      param:temp,
      tabName:tempName
    })
    // console.log(this.props.params)
    // 保存参数
    let temp1 = this.props.params;
    temp1[event.item.props.name] = event.key;
    this.props.changeParams(temp1);
    // 发出请求
    this.props.getActivityList(this.state.param)
  }
  render() {
    // overlay的样式对象
    const overlayStyle = {width:'91vw', margin:'0 4.5vw', height:'40vh', overflow:'scroll'};
    // 保存接口信息
    var params = {belongs:0};
    const belongsData = ['羽毛球社', '乒乓球社', '篮球社', '青协', '学生会', '文艺社',
    '足球队', '广播站', '街舞社', '绿派社', '轮滑社', 'ERP协会', 'IT帮']
    const belongs = (
      <Menu onClick={this.handleClick} style = {overlayStyle}>
        {
          belongsData.map((item, index) => {
            return <Menu.Item key={index+2} name="belongs">{item}</Menu.Item>
          })
        }
      </Menu>
    );
    const type = (
      <Menu onClick={this.handleClick} style = {overlayStyle}>
        <Menu.Item key="1" name="type">社会实践</Menu.Item>
        <Menu.Item key="2" name="type">创新创业</Menu.Item>
        <Menu.Item key="3" name="type">校园服务</Menu.Item>
        <Menu.Item key="4" name="type">志愿服务</Menu.Item>
        <Menu.Item key="5" name="type">学术讲座</Menu.Item>
        <Menu.Item key="6" name="type">学科竞赛</Menu.Item>
        <Menu.Item key="7" name="type">思想引领</Menu.Item>
        <Menu.Item key="8" name="type">体育健身</Menu.Item>
        <Menu.Item key="9" name="type">文化熏陶</Menu.Item>
        <Menu.Item key="10" name="type">素质拓展</Menu.Item>
        <Menu.Item key="11" name="type">职业规划</Menu.Item>
        <Menu.Item key="0" name="type">不限</Menu.Item>
      </Menu>
    );
    const order = (
      <Menu onClick={this.handleClick} name="order" style={{width:'91vw', margin:'0 4.5vw'}}>
        <Menu.Item name="order" key="1">即将开始</Menu.Item>
        <Menu.Item name="order" key="2">最热排序</Menu.Item>
      </Menu>
    );
    const status = (
      <Menu onClick={this.handleClick} style={{width:'91vw', margin:'0 4.5vw'}}>
        <Menu.Item name="status" key="1">未开始</Menu.Item>
        <Menu.Item name="status" key="2">进行中</Menu.Item>
        <Menu.Item name="status" key="3">已结束</Menu.Item>
        <Menu.Item name="status" key="0">不限</Menu.Item>
      </Menu>
    );
    return ( 
      <div className={styles.menuContain}>
          <Dropdown overlay={type}>
            <a className="ant-dropdown-link" href="#">{this.state.tabName.type}<Icon type="caret-down" /></a>
          </Dropdown>
          <Dropdown overlay={belongs}>
            <a className="ant-dropdown-link" href="#">{this.state.tabName.belongs}<Icon type="caret-down" /></a>
          </Dropdown>
          <Dropdown overlay={status}>
            <a className="ant-dropdown-link" href="#">{this.state.tabName.status}<Icon type="caret-down" /></a>
          </Dropdown>
          <Dropdown overlay={order}>
            <a className="ant-dropdown-link" href="#">{this.state.tabName.order}<Icon type="caret-down" /></a>
          </Dropdown>
      </div>
     );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getActivityList: (params) => {
      dispatch(getActivityList(params))
    },
    changeParams:(params)=>{
      dispatch({
        type: 'UPDATA_PARAMS',
        params: params
      })
    }
  }
}
const mapStateToProps = (state) => {
  return {
    activityList: state.activityReducer.activity,
    params: state.activityReducer.params
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuContain);