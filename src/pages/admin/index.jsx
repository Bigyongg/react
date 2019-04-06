import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Row,Col} from 'antd'
import MemoryUtils from '../../util/MemoryUtils'
import './index.less'

import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Footer from '../../components/footer'

export default class Admin extends Component {
//如果用户没有登录，自动跳转到登录界面


  render() {
    if(!MemoryUtils.user || !MemoryUtils.user._id){
      //跳转
      return < Redirect to = './login'/> ///自动跳转到指定的路由

    }
    return (
      <Row className = 'container'>
        {/*左侧的导航start*/}
        <Col span={4} >
          <LeftNav/>
        </Col>
        {/*左侧的导航end*/}
        {/*右侧start*/}
        <Col span={20} className = 'main'>
          <Header/>
          <div  className = 'content'>界面主体区域</div>
          <Footer/>
        </Col>
      {/*右侧end*/}

      </Row>
    )
  }
}