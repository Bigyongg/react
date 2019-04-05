import React, {Component} from 'react'
import PropTypes from 'prop-types'
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
  //声明组件接受属性的属性名，属性值的类型一级级属性的必要性
  static propTypes ={
    login: PropTypes.func.isRequired
  }
  //添加提交表单的监听回调事件
  handleSubmit = (event)=>{
    //阻止事件的默认行为
    event.preventDefault()
    //进行表单验证
    const {form} = this.props
    form.validateFields((err,values)=>{
      if (!err){
        //读取输入输入数据,values包含所有输入数据的对象
        const values =  this.props.form.getFieldsValue()
        //console.log('发送登录ajax请求参数',values)
        this.props.login(values)

        //提交后自动清空输入
        this.props.form.resetFields()
        console.log('handleSubmit()')
      }else {
        //表单验证不通过
      }
    })



  }
  //自定义检验密码,如果传值，则失败，输出括号里面的内容
  validatePwd =(rule, value, callback)=>{
    value = value.trim()
    if (value===''){
      callback('密码必须输入')
    } else if (value.length<4 || value.length>8) {
      callback('密码长度必须为4-8位')
    }else {
      callback()
    }

  }
  render() {
    //getFieldDecorator用来包装表单项组件标签，生成新的组件标签
    const {getFieldDecorator}  =this.props.form
    return (
      <Form className='login-form' onSubmit={this.handleSubmit}>
        <FormItem>
          {
            getFieldDecorator('username',{//配置对象：属性名是特定的名称
              initialValue: 'admin',//页面刷新上来为空字符串
              rules: [
                { whitespace:true , required: true, message: '必须输入用户名' },
                { min: 4, message: '用户名长度不能小于4' }
              ],
            })(
              <Input type='text' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />)
          }

        </FormItem>
        <FormItem>
          {
            /*
            * 密码必须输入，，且长度为4-8位
            *function(value) => transformedValue:any
            * */
            getFieldDecorator('password',{
             // 密码上来时候为空字符串
              initialValue:'',
              rules: [
                { validator:this.validatePwd }
              ],
            })(
              <Input type='password' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码" />
            )
          }

        </FormItem>
        <FormItem>
        <Button type='primary' className='login-form-button' htmlType='submit'>登录6</Button>
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