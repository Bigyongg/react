/*包含n个接口函数请求的模块
* 根据接口文档编写
* 接口请求函数：使用ajax() 返回promise对象
* */
//登录
import ajax from './ajax'
 const BASE = ''
 // export function reqLogin(username,password) {
 //   return ajax('./login',{username,password},'POST')
 // }
export const reqLogin = (username,password)=> ajax(BASE+'./login',{username,password},'POST')