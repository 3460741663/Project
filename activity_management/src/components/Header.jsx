import React from'react';

class Header extends React.Component {
  click() {
    console.log('点击事件绑定成功！')
  }
  render () {
    return (
      <div>
        <span>我是组件Header !</span>
        <button onClick={this.click}> Click me !</button>
      </div>
    )
  }
}
export default Header;