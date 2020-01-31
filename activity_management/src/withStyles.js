import React, { Component } from 'react';
//函数返回组件
export default (DecoratedComponent, styles) => {
  return class NewComponent extends Component {
    componentWillMount() {
      if (this.props.staticContext) {
        // styles._getCss来自isomorphic-style-loader
        this.props.staticContext.css.push(styles._getCss());
        console.log(this.props.staticContext)
      }
      
    }
    render() {
      return <DecoratedComponent {...this.props} />
    }
  };
}