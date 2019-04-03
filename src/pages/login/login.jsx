import React, {Component} from 'react'
import {Form,Input,Icon,Button} from 'antd'
import logo from './images/logo.png'
import './index.less'

 const FormItem = Form.Item//<FromItem>
export default class Login extends Component {

  render() {

    return (
      <div className='login'>
        <div className='login-header'>
          <img src={logo} alt="logo"/>
          React项目管理：后台管理系统
        </div>
        <div className='login-content'>
          <div className='login-box'>
          <div className='error-msg-wrap'> </div>
          <div className='title'>用户登录</div>
          <Form className='login-form'>
            <FormItem>
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
            </FormItem>
            <FormItem>
              <Input type='password' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码" />
            </FormItem>
            <Button type='primary' className='login-form-button'>登录</Button>

          </Form>
          </div>
        </div>

      </div>
    )
  }
}