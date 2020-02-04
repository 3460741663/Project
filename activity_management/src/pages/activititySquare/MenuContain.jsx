import { Menu, Dropdown, Icon, message } from 'antd';
import React, { Component } from 'react';
import styles from './activitySquare.css'
class MenuContain extends Component {
  handleClick(event) {
    message.info(event.key);
  }
  render() {
    const menu = (
      <Menu onClick={this.handleClick}>
        <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd memu item</Menu.Item>
        <Menu.Item key="3">3rd menu item</Menu.Item>
      </Menu>
    );
    return ( 
      <div className={styles.menuContain}>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">分类<Icon type="caret-down" /></a>
          </Dropdown>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">归属组织<Icon type="caret-down" /></a>
          </Dropdown>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">状态<Icon type="caret-down" /></a>
          </Dropdown>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">排序<Icon type="caret-down" /></a>
          </Dropdown>
      </div>
     );
  }
}
export default MenuContain;