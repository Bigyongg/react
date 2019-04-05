/*用来发送ajax请求的模块
*
* 封装ajax
* 函数的返回值是promise对象
* */
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},type='GET') {

  return new Promise((resolve,reject)=>{
    //执行异步ajax请求
    let promise
    if (type==='GET'){
      promise = axios.get(url,{ //配置对象
        params:data
      })
    } else {
      promise = axios.post(url,data)
    }

    promise.then(response =>{
      //请求成功，调用resolve()并且传递数据
      resolve(response.data)


    }).catch(error =>{
      message.error('请求异常' + error.message)
    } )


    //请求失败，不调用reject()，消失请求错误的对象

  })


}
 async function login() {
  // const response = await ajax('./login',{username:'Tom',password:'123'})
  //  const result = response.data
   const result = await ajax('./login',{username:'Tom',password:'123'})
   if (result.status===0){//成功了

   } else {//失败了

   }

}