import React, {Component} from 'react'
import {Button, Form, Icon, Input} from "antd";
import login from "./login";
const FormItem = Form.Item

/*1收集数据
2.验证表单数据
*
*
*
* */

class LoginForm extends Component {
  //添加提交表单的监听回调事件
  handleSubmit = (event)=>{
    //阻止事件的默认行为
    event.preventDefault()
    //读取输入输入数据
     const values =  this.props.form.getFieldsValue()
   console.log(values)
  }
  render() {
    //getFieldDecorator用来包装表单项组件标签，生成新的组件标签
    const {getFieldDecorator}  =this.props.form
    return (
      <Form className='login-form' onSubmit={this.handleSubmit}>
        <FormItem>
          {
            getFieldDecorator('username')(
              <Input type='text' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />)
          }

        </FormItem>
        <FormItem>
          {
            getFieldDecorator('password')(
              <Input type='password' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码" />
            )
          }

        </FormItem>
        <FormItem>
        <Button type='primary' className='login-form-button' htmlType='submit'>登录</Button>
        </FormItem>
      </Form>
    )
  }
}
/*返回一个暴露后的高阶函数Form.create()(form组件标签)
作用:向form传递一个属性.form:对象，包含了很多方法
form对象
1收集表单内容
2.验证表单数据
*/
const WrapLoginForm = Form.create()(LoginForm)
//把返回的高阶函数暴露出去 3
export default WrapLoginForm