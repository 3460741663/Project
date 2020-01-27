import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, { Component } from 'react';
import styles from './Login.css'

class NormalLoginForm extends React.Component {
  componentWillMount() {
    if (this.props.staticContext) {
      this.props.staticContext.css.push(styles._getCss());
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  handleChange(e) {
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  render() {
    const state = {
      userName:'',
      password:''
    }
    return (
      <div>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Username"
          size="large"
          value={this.state.userName}
          onChange={this.handleChange}
        />
        <br/>
        <br/>
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Password"
          size="large"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <br/>
        <br/>
        <Button 
          className="login-form-button" 
          size="large" 
          ghost="true"
          block 
          onClick={()=>{
            console.log(this.state)
          }}
        >登录</Button>
      </div>
    );
  }
}

export default NormalLoginForm;
