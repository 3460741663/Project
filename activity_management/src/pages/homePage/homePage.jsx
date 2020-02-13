import React, { Component } from 'react';
import styles from './HomePage.css';
// import Menu from '../activititySquare/MenuContain';
import { Carousel, SearchBar, Grid } from 'antd-mobile';
import { Icon } from 'antd';
import { Gift, Defend, Detail, Dollar, Activity, Collection, Dailoge, Help, Tag, Like } from '../mine/iconSource';
import { connect } from 'react-redux';
import { getNews } from './action';
import WithStyles from '../../withStyles'

// item 函数组件，简化代码结构
function NewsItem({data}) {
  return (
    <div className={styles.newsItem}>
      <div className={styles.content}>
        <h4 className={styles.title}>{data.title}</h4>
        <span style={{color:'grey'}}>{data.pdate_src}&nbsp;&nbsp;{data.src}</span>
      </div>
      <div className={styles.imgContain}>
        <img className={styles.img} src={data.img != '' ? data.img : './image/NOTFOUND.gif'} alt=""/>
      </div>
    </div>
  )
}
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ['1', '2', '3']
    }
  }
  componentWillMount() {
    // 去获取数据
    this.props.getNews()
    if (this.props.staticContext) {
      this.props.staticContext.css.push(styles._getCss());
    }
    setTimeout(() => {
      this.setState({
        data: ['1', '2', '3'],
      });
    }, 100);
  }
  render() {
    const data = [{icon: Collection, text: '收藏'}, {icon: Like, text: '部落'}, {icon: Activity, text: '活动'},
      {icon: Help, text: '帮助'}, {icon: Defend, text: '申诉'}, {icon: Detail, text: '我的学分'},
      {icon: Tag, text: '标签'}, {icon: Dailoge, text: '客服'}
    ];
    const newData = this.props.news ? this.props.news.result : [];
    return (
      <div className={styles.contain}>
        <div className={styles.head}>
          <Icon type="bell" /><div style={{ width: '85vw' }}><SearchBar placeholder='搜索活动、新闻' /></div><Icon type="qrcode" />
        </div>
        <div className={styles.body}>
          <div>
          <Carousel autoplay infinite >
          {this.state.data.map(val => (
            <a key={val} href="#" style={{ display: 'inline-block', width: '100%'}} >
              <img src={`./image/slide${val}.jpg`} style={{ width: '100%',height:'20vh', verticalAlign: 'top' }} onLoad={() => {window.dispatchEvent(new Event('resize'));}}/>
            </a>
          ))}
        </Carousel>
          </div>
          <div className={styles.tool}>
            <Grid data={data} hasLine={false} columnNum={5} itemStyle={{backgroundColor: '#efeff4'}}/>
          </div>
          <div className={styles.news}>
            {
              newData && newData.map((item, index) =>{
                return <NewsItem data={item} key={index} />
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

// export default HomePage;
const mapDispatchToProps = (dispatch) => {
  return {
    getNews:()=>{
      dispatch(getNews())
    }
  }
}
const mapStateToProps = (state) => {
  return {
    news: state.activityReducer.news
  }
}
const homePage = connect(mapStateToProps, mapDispatchToProps)(WithStyles(HomePage, styles));

homePage.loadData = (store) => {
  return store.dispatch(getNews())
};
export default homePage;