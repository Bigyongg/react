/*
* 发送ajax请求的函数。
*封装axios+promise
*函数的返回值是promise对象  后面配合  async await
*3.内部处理好统一处理异常，
* 4.自己使用promise
* 外部不使用try catch
* 解决办法:在 axios外面包一层promise
* 4.1异步返回响应数据。外部的调用异步得到的直接就是数据了
*
* */
import  axios from 'axios'
import {message} from 'antd'


export  default  function  ajax(url, data={},type="GET") {//形参默认值
return new Promise((resolve,reject)=>{
//执行异步ajax请求
  let promise
  if(type==='GET'){
    promise = axios.get(url,{//配置对象
      //指定包含所有query参数的数据对象
      params:data

    })
  }else {
    promise = axios.post(url,data)
  }



  promise.then(response =>{
    resolve(response.data)
    //请求成功调用resolve

  }).catch(error =>{
    //不能调用reject()
    message.error('请求异常:' +error.message)

  })



//请求失败，不调用reject，显示错误请求代码


})


}
async function login() {
  const response = await ajax('/login', {username: 'tom', password: '123'}, 'POST')
  //data里面保存着响应数据
  const result = response.data
  if (result === 0) {//成功的代码

  }

}


















































