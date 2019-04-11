import React, {Component} from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message

} from 'antd'
import LinkButton from "../../components/link-button";

//获取商品分页列表/搜索获取商品分页列表
import {reqProducts,
  reqSearchProducts,
  reqUpdataProductStatus



} from '../../api'
import {PAGE_SIZE} from "../../util/constant";
const {Option} = Select
/*
* 商品的搜索列表路由组件
* */
export default class ProductIndex extends Component {
  //产品的状态
    state = {
      products:[],  //当前产品的数组
      total:0, //商品总数量
      loading:false  ,            //请求前后变化
      searchType:'productName'  , //搜索类型productName：按名称搜
      searchName: ''
    }
//获取指定页码的商品列表(可能带搜索)
  getproducts = async (pageNum) =>{
      //保存请求的页码，保存在this里面
     this.pageNum = pageNum
      //显示loading
    this.setState({
      loading:true
    })
    const {searchName,searchType} = this.state

    let result
    if (!searchName){
      //一般分页
       result =  await reqProducts(pageNum,PAGE_SIZE)
    }else {
      //搜索分页
       result =  await reqSearchProducts({pageSize:PAGE_SIZE, pageNum,searchType,searchName})
    }

    //隐藏loading
    this.setState({
      loading:false
    })
    if (result.status===0){
      const {total,list} = result.data//添加到状态数据中

      this.setState({  //更新状态数据
        products:list,
        total


      })
    }
  }

  //更新商品的状态
  updataProductStatus = async (productId,status)=>{
      //异步的ajaxreqUpdataProductStatus方法
     const result = await reqUpdataProductStatus({productId,status})
      message.success('ok')
    if (result.status===0) {
      //成功之后，重新获取列表，页码传参数
      this.getproducts(this.pageNum)
    }

  }

  //在合适的时机发送请求第一页的数据state状态
  componentDidMount() {
      //获取商品的列表
    this.getproducts(1)
  }


  //列的数据
  componentWillMount() {

    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品详情',
        dataIndex:'desc',
      }
      , {
        title: '价格',
        dataIndex: 'price',
        // 提供一个复杂的结构，有其他相关的数据
        render: (price) => '￥' + price

      },
      {
        title: '状态',
        // dataIndex:'status',
        width:150,
        // 提供一个复杂的结构，有其他相关的数据
        render: (product) => {
          //确定按钮的名称
          const btnText = product.status===1 ? '下架' :'上架'
          //确定按钮旁边的文字内容
          const text = product.status===1 ? '在售' : '已下架'
          //确定文本的内容

         //得到点击后新的状态值
         const status =  product.status===1 ? 2 : 1

          return(
            <span>
              <Button type='primary' onClick={()=> this.updataProductStatus(product._id,status)}>{btnText}</Button> &nbsp;
              <span>{text}</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        width:110,
        // 提供一个复杂的结构，有其他相关的数据
        render: (product) => {
          return(
            <span>
              <LinkButton onClick={()=>this.props.history.push('/product/detail',{product})}>详情</LinkButton>&nbsp;&nbsp;&nbsp;
              <LinkButton>修改</LinkButton>
                         </span>
          )
        },



      }

      ];
    }

  render() {
      //读取当前产品的状态
    const {products,loading,total,searchType} = this.state  //读取状态数据
    //Card左侧结构
    const title = (
      <span>
        <Select value={searchType} style={{width:140,marginRight:10}}
        onChange={val=>this.setState({searchType:val})}

        >
          <Option value='productName'>按名搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
         <Input placeholder='请输入关键字' style={{width:170,marginRight:10}}

         onChange={event=> this.setState({searchName:event.target.value})}

         />
        <Button type='primary' onClick={()=>this.getproducts(1)}>搜索</Button>
      </span>
    )
    //Card右侧结构
    const exact = (
      <Button type='primary'>
        <Icon type='plus'></Icon>
        添加产品
      </Button>
    )

    return (
      <Card title={title} extra={exact}>
        <Table
          bordered
          rowKey='_id'
          dataSource={products}
          columns={this.columns}  //初始列的数组
          loading={loading} //请求前后变化
          pagination={{total,pageSize: PAGE_SIZE, showQuickJumper: true, showSizeChanger: true}}
          onChange={(pageNum)=>this.getproducts(pageNum.current)}

        />









      </Card>
    )
  }
}