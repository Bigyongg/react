/*
* 包含n个操作 local storage的工具函数的模块
* 保存，读取，移除user
*
* */
const USER_KEY = 'user_key'
export default {
  saveUser (user){
    //local storage只能保存字符串string，如果传递的是对象，是自定调用对象的toString()并且保存
    localStorage.setItem('USER_KEY',JSON.stringify(user))//保存的必须是对象的json串
  },
  getUser (){//如果存在，需要返回的是对象，如果没有值，返回{}
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
  },
  removeUser (){
    localStorage.removeItem(USER_KEY)
  }
}