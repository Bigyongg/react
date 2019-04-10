import React, {Component} from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table

} from 'antd'
import LinkButton from "../../components/link-button";

//获取商品分页列表/搜索获取商品分页列表
import {reqProducts,reqSearchProducts} from '../../api'
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
      //显示loading
    this.setState({
      loading:true
    })
    const {searchName,searchType} = this.state

    let result
    if (!searchName){
      //一般分页
       result =  await reqProducts(pageNum,2)
    }else {
      //搜索分页
       result =  await reqSearchProducts({pageSize:5, pageNum,searchType,searchName})
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
        width:150,
        // 提供一个复杂的结构，有其他相关的数据
        render: (product) => {
          return(
            <span>
              <Button type='primary'>下架</Button> &nbsp;
              <span>在售</span>
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
              <LinkButton>详情</LinkButton>&nbsp;&nbsp;&nbsp;
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
          pagination={{total,pageSize: 2, showQuickJumper: true, showSizeChanger: true}}
          onChange={(pageNum)=>this.getproducts(pageNum.current)}

        />









      </Card>
    )
  }
}