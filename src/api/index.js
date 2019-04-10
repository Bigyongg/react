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
export  const  getWeather  = (city)=>{

  return new Promise((resolve,reject)=>{
  const url =`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
   jsonp(url,{},(err,data)=>{
    if (!err && data.status==='success'){
     const {dayPictureUrl,weather} = data.results[0].weather_data[0]
      //成功了调用resolve(),并且指定数据
      resolve({dayPictureUrl,weather})
    }else {
     alert('获取天气数据失败')
    }
   })
})
}
//获取分类列表
export const  reqCategories= (parentId='0')=> ajax('/manage/category/list',{parentId})

//添加分类
export const reqAddCategory = (categoryName,parentId)=>ajax('manage/category/add',{categoryName,parentId},'POST')

//更新分类
export const reqUpDateCategory = ({categoryId,categoryName})=>ajax('/manage/category/update',{categoryId,categoryName},'POST')

//根据分类id获取分类
export const reqCategory = (categoryId)=>ajax('/manage/category/info',{categoryId},)



//商品相关的

//获取商品分页列表

export const reqProducts =(pageNum,pageSize)=>ajax('/manage/product/list',{pageNum,pageSize})

//搜索获取商品分页列表
/*
* SearchName:搜索的关键字
* pageSize:每页的条目数
* pageSNum：当前请求第几页面（从1开始）
*
* searchType：
* */
export const reqSearchProducts = ({pageSize, pageNum,searchType,searchName})=>ajax('/manage/product/search',{

 pageSize,
 pageNum,
[searchType]:searchName


})











