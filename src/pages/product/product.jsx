import React, {Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import ProductIndex from './index'
import ProductDetail from './detail'
import ProductAddUpdate from './add-update'
/*
产品管理路由组件
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/product' component={ProductIndex} />
        <Route path='/product/detail' component={ProductDetail} />
        <Route path='/product/addupdate' component={ProductAddUpdate} />
        <Redirect to='/product'/>
      </Switch>
    )
  }

/*
*
* 请求的路径现在是/product/detail
* /product/===>product ==>ProductIndex
* detail==>   ProductIndex中查找
*
* ‘解决办法，精准匹配  exact
*
* */























}