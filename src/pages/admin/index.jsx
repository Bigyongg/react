import React, {Component} from 'react'
import MemoryUtils from '../../util/MemoryUtils'
import {Redirect} from 'react-router-dom'

export default class Admin extends Component {
//如果用户没有登录，自动跳转到登录界面


  render() {
    if(!MemoryUtils.user || !MemoryUtils.user._id){
      //跳转
      return < Redirect to = './login'/> ///自动跳转到指定的路由

    }
    return (
      <div>
        Admin
      </div>
    )
  }
}