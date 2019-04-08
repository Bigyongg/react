/*包含n个接口函数请求的模块
* 根据接口文档编写
* 接口请求函数：使用ajax() 返回promise对象
* */
//登录
import jsonp from 'jsonp'
import ajax from './ajax'
 const BASE = ''
 // export function reqLogin(username,password) {
 //   return ajax('./login',{username,password},'POST')
 // }
export const reqLogin = (username,password)=> ajax(BASE+'./login',{username,password},'POST')

/*
* 获取天气的jsonp请求
* jsonp解决get类型的ajax跨域请求
* 动态产生一个 <script src = ""/被请求的接口？callback = fn">浏览器会发送一个普通的http请求，（预先定义好一个回调函数）
*服务器端：处理强求，返回的是函数调用的js语句，(参数就是要返回的数据)
* 浏览器端接收到相应后自定执行js代码，调用前面准备好的回调函数
* */
export  const  getWeather  = (city)=>{return new Promise((resolve,reject)=>{
 const url =`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
   jsonp(url,{},(err,data)=>{
    if (!err && data.status==='success'){
     const {dayPictureUrl,weather} = data.result[0].weather_data[0]
    }else {
     alert('666')
    }
   })
})
}


















