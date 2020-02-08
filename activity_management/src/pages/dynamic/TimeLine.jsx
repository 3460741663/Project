import React, { Component } from 'react';
import styles from './TimeLine.css';
import withStyles from '../../withStyles'
import { FaBeer, FaAd } from 'react-icons/fa'

function VerticalTimelineElement({data}) {
  return (
    <div className={styles.vertical_timeline_element}>
      <FaBeer className={`${styles.vertical_timeline_element_icon} ${styles.bounce_in}`} />
      <div className={styles.vertical_timeline_element_content}>
        <div className={styles.vertical_timeline_element_content_arrow}></div>
        <h3 className={styles.vertical_timeline_element_title}>{data.title}</h3>
        <h4 className={styles.vertical_timelineelement_subtitle}>{data.belongs}</h4>
        <p>{data.content}</p>
        <span className={styles.vertical_timeline_element_date}>{data.date}</span>
      </div>
    </div>
  )
}
class TimeLine extends Component {
  render() {
    const data = [
      {
        title: '我是一条数据',
        belongs: '所属机构',
        content: '本次活动旨在促进同学们之间团结互助',
        date: '2039-19-5'
      },
      {
        title: 'Creative Director',
        belongs: 'Miami, FL',
        content: 'Creative Direction, User Experience, Visual Design, Project Management, Team Leading',
        date: '2039-19-5'
      }
    ]
    return (
      <div className = {styles.vertical_timeline}>
        {
          data.map((item, index)=>{
            return (<VerticalTimelineElement data={item}  />)
          })
        }
        {/* <VerticalTimelineElement data={item[0]}  />
        <VerticalTimelineElement data={item[1]}  />
        <VerticalTimelineElement data={item[1]}  />
        <VerticalTimelineElement data={item[1]}  />
        <VerticalTimelineElement data={item[1]}  />
        <VerticalTimelineElement data={item[1]}  /> */}
      </div>
    );
  }
}

export default withStyles(TimeLine, styles);