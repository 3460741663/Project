import React, { Component } from 'react';
import { Grid, ImagePicker } from 'antd-mobile';
import styles from './Mine.css';
import withStyles from '../../withStyles';
import { Gift, Defend, Detail, Dollar, Activity, Collection, Dailoge, Help, Tag, Like } from './iconSource';
import ImagePick from './ImagePick'

function ContentItem({data}){
  return (
    <div className={styles.contentItem}>
      <span>{data.number}</span>
      <span>{data.name}</span>
    </div>
  )
}
class Mine extends Component {
  render() {
    const data1 = [{icon: Gift, text: '福利中心'}, {icon: Detail, text: '兑换明细'}, {icon: Dollar, text: '豆子'}];
    const data2 = [{icon: Collection, text: '收藏'}, {icon: Like, text: '部落'}, {icon: Activity, text: '活动'},
      {icon: Help, text: '帮助'}, {icon: Defend, text: '申诉'}, {icon: Detail, text: '我的学分'},
      {icon: Tag, text: '标签'}, {icon: Dailoge, text: '客服'}
    ];
    const data3 = [{icon: Gift, text: '培训'}, {icon: Detail, text: '测评'}, {icon: Dollar, text: '简历'}];
    return (
      <div className={styles.contain}>
        <div className={styles.header}>
          {/* <ImagePick className={styles.ImagePick} /> */}
          <div className={styles.portrait}>
            <img src="https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg" alt="" />
          </div>
          <div className={styles.content}>
            <ContentItem data={{name:'学分', number:'46.5'}} />
            <ContentItem data={{name:'积分', number:'65'}} />
            <ContentItem data={{name:'诚信度', number:'95%'}} />
            <ContentItem data={{name:'豆子', number:'0'}} />
          </div>
        </div>
        <div className={styles.body}>
          <div>
            <div className={styles.sub_title}>我的财富</div>
            <Grid data={data1} hasLine={false} />
          </div>
          <div>
            <div className={styles.sub_title}>我的AM</div>
            <Grid data={data2} hasLine={false} />
          </div>
          <div>
            <div className={styles.sub_title}>我的职场</div>
            <Grid data={data3} hasLine={false} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(Mine, styles);