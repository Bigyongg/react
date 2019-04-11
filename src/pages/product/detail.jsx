import React, {Component} from 'react'
import {
  Card,
  List,
  Icon

} from "antd";
import {reqCategory} from '../../api'  //根据Id获取分类
import LinkButton from '../../components/link-button'
import {BASE_IMG_URL} from "../../util/constant";
const {Item} = List
/*
商品详情路由组件
* */
export default class ProductDetail extends Component {
//设计所属的分类状态
  state = {
    cName1:'',  //一级分类的名称
    cName2:''  //二级分类的名称

  }
  //获取当前分类的名称函数
    getCategoryNames = async () =>{
    //得到商品分类的id
    const {pCategoryId,categoryId} = this.props.location.state.product
    if (pCategoryId==='0'){//当前商品是一级分类下的商品
      //根据Id获取分类的ajax函数
      const result = await reqCategory(categoryId)
       const cName1 = result.data.name
      this.setState({
        cName1
      })

    }else {//当前商品是二级分类下的商品
      //先获取一级分类
      const result1 = await reqCategory(pCategoryId)
      const result2 = await reqCategory(categoryId)
      const cName1 = result1.data.name
      const cName2 = result2.data.name
      this.setState({
        cName1,
        cName2
      })

      //1所有的promise的异步请求都会执行，自身返回一个promise对象
     //2当所有的异步请求执行完成才调用resolve([ result1,result2])
     //3.reject() 只要有一个异步处理失败。立即调用reject
      const promise =  Promise.all([reqCategory(pCategoryId)])

      promise.then((results) =>{
        const results1 = results[0]
        const results2 = results[0]

      }).catch()



    }
  }
  componentDidMount() {
    //异步获取当前分类的名称
    this.getCategoryNames()

  }

  render() {
    //从location中取出state中product
    const  {name,desc,price,imgs,detail}= this.props.location.state.product
    const {cName1,cName2} = this.state
    const title = (
    <span>
      <LinkButton onClick={()=> this.props.history.goBack()}>
        <Icon type = 'arrow-left' style={{fontSize:20}}></Icon>
      </LinkButton> 商品详情

    </span>
    )
    return (
     <Card title={title} className='detail'>
       <List>
          <Item>
            <span className='left'>商品详情：</span>
            <span>{name}</span>
          </Item>
         <Item>
           <span className='left'>商品描述：</span>
           <span>{desc}</span>
         </Item>
         <Item>
         <span className='left'>商品价格：</span>
         <span>{price}元</span>
       </Item>
         <Item>
           <span className='left'>所属分类：</span>
           <span>{cName1}-->{cName2}</span>
         </Item>
         <Item>
           <span className='left'>商品图片：</span>
           <span>{
             imgs.map(img => <img key={img} src={BASE_IMG_URL +img} />)
           }
             <Item>
           <span className='left'>商品详情：</span>
               {/*里面可能有块元素，得改成div,里面的代码把html标签解析*/}
           <div dangerouslySetInnerHTML={{__html: detail}}></div>
         </Item>
           </span>
         </Item>
       </List>
     </Card>
    )
  }
}