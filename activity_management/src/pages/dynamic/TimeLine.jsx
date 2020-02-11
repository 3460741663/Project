import React, { Component } from 'react';
import styles from './TimeLine.css';
import withStyles from '../../withStyles'
import { FaBeer, FaCalendarTimes } from 'react-icons/fa';

function VerticalTimelineElement({data}) {
  const content = ['未签到', '已签到'];
  const iconStyle = { background: 'rgb(33, 150, 243)', color: '#fff' }
  return (
    <div className={styles.vertical_timeline_element}>
      <FaCalendarTimes className={`${styles.vertical_timeline_element_icon} ${styles.bounce_in}`} style={iconStyle} />
      <div className={styles.vertical_timeline_element_content}>
        <div className={styles.vertical_timeline_element_content_arrow}></div>
        <h3 className={styles.vertical_timeline_element_title}>{data.name}</h3>
        <h4 className={styles.vertical_timelineelement_subtitle}>{data.signed ? content[data.signed] : '助签员'}</h4>
        <p>{data.description}</p>
        <span className={styles.vertical_timeline_element_date}>{data.start_time}</span>
      </div>
    </div>
  )
}
class TimeLine extends Component {
  render() {
    const {data} = this.props;
    return (
      <div className = {styles.vertical_timeline}>
        {
          data.map((item, index)=>{
            return (<VerticalTimelineElement key={index} data={item}  />)
          })
        }
      </div>
    );
  }
}

export default withStyles(TimeLine, styles);