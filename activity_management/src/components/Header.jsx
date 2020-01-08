import React from'react';
import { Link } from 'react-router-dom'

class Header extends React.Component {
  click() {
    console.log('点击事件绑定成功！')
  }
  render () {
    return (
      <div>
        <Link to='/'>home</Link>
        <Link to='/login'>login</Link>
        <span>我是组件Header !</span> 
        <button onClick={this.click}> Click me !</button>
      </div>
    )
  }
}
export default Header;