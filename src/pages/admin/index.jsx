import React, {Component} from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import {Layout} from 'antd'
import MemoryUtils from '../../util/MemoryUtils'


import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Footer from '../../components/footer'

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const {Sider, Content,} = Layout;

export default class Admin extends Component {
//如果用户没有登录，自动跳转到登录界面


  render() {
    if(!MemoryUtils.user || !MemoryUtils.user._id){
      //跳转
      return < Redirect to = './login'/> ///自动跳转到指定的路由

    }
    return (
      <Layout>
        {/*左侧布局s*/}
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        {/*左侧布局e*/}
        <Layout>
          <Header/>
          <Content style={{background:'skyblue'}}>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/user' component={User}/>
              <Route path='/role' component={Role}/>
              <Route path="/charts/bar" component={Bar}/>
              <Route path="/charts/pie" component={Pie}/>
              <Route path="/charts/line" component={Line}/>
              <Redirect to='/home'/>{/*如果和上面的都不一致，自动跳转到这个*/}
            </Switch>
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    )
  }
}