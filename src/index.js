/*入口js
*
* */
import React from 'react'

import  ReactDom from 'react-dom'

import  App from './App'
import storageUtil from './util/storageUtil'
import MemoryUtils from './util/MemoryUtils'
//将local storage存储的user保存到内存中
const user =  storageUtil.getUser()

if (user){
  MemoryUtils.user = user
}
ReactDom.render(<App/>,document.getElementById('root'))