/*包含n个接口请求函数的模块
*1.根据接口文档编写
*函数：使用 ajax()返回值。promsie对象
*
* */
//登录
import ajax from './ajax'
const BASE = ''

// export function reqLogin(username,password) {
//    return ajax('./login',{username,password},'POST')
// }
//登录的ajax请求
export  const  reqLogin  =(username,password)=>ajax(BASE +'./login',{username,password},'POST')






















