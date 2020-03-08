import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, { Component } from 'react';
import styles from './Login.css';
// import { message } from 'antd';
import { Toast } from 'antd-mobile'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.staticContext) {
      this.props.staticContext.css.push(styles._getCss());
    }
  }
  render() {
    const userName = React.createRef();
    const passWord = React.createRef();
    const {verify} = this.props;
    if(this.props.user){
      return <Redirect to='/home' />;
    }
    return (
      <div>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Username"
          size="large"
          ref={userName}
        />
        <br/>
        <br/>
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Password"
          size="large"
          ref={passWord}
        />
        <br/>
        <br/>
        <Button 
          className="login-form-button" 
          size="large" 
          ghost="true"
          block
          onClick={()=>{
            let account = {
              userName:userName.current.state.value,
              passWord:passWord.current.state.value
            };
            verify(account).then(res => {
              if(res.data){
                // redux
                this.props.loginSuccess(res);
              }else{
                Toast.info('账号或密码错误！');
              }
            })
          }}
        >登录</Button>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (res) => {
      dispatch({
        type: 'LOGIN',
        user: res
      })
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);
