import React, {Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import ProductIndex from './index'
/*
产品管理路由组件
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route to='product'/>

      </Switch>
    )
  }

























}