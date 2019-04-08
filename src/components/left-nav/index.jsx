import React, {Component} from 'react'
import {Menu,Icon} from 'antd'
import {Link,withRouter} from 'react-router-dom'
import './index.less'
import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'
const SubMenu = Menu.SubMenu
const Item = Menu.Item
/*
* 左侧导航
*
*
*
* */
class LeftNav extends Component {
  /*返回包含n个<Item>和<SunMenu的数组>
  *1.使用数组map方法
  * 2.使用数组的reduce()方法实现二级菜单
  * 3.使用arr的reduce() + 递归实现三级菜单
  * arr.reduce((pre,item) => pre+ (item%2===0 ? item : 0),0)
  * */
// 递归实现

  getMenuNodes = (list)=>{
    return list.reduce((pre,item)=>{
      if (!item.children){
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}><Icon type={item.icon}/>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      }else {//item有childern 才调用递归
        //确定openKey的值,并保存到组件对象
        const path =this.props.location.pathname
        const cItem = item.children.find(cItem =>cItem.key===path)
        if (cItem) {
          const openKey =  item.key
          this.openKey = openKey
        }

      pre.push((
        <SubMenu key={item.key} title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
          {
            this.getMenuNodes(item.children)
          }
        </SubMenu>
      ))
      }
      return pre
    },[])
  }





  grtMenuNodes_reduce = () => {
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}><Icon type={item.icon}/>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else {
        pre.push((
          <SubMenu key={item.key} title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
            {/*根据item.children数据的数组，生成<Item>的数组*/}
            {
              item.children.reduce((pre,cItem) =>{
              pre.push((
                <Menu.Item key={cItem.key}>
                  <Link to={cItem.key}>
                    <Icon type={cItem.icon} />
                    <span>{cItem.title}</span>
                  </Link>
                </Menu.Item>
              ))





                return pre
            },[])

            }
          </SubMenu>
        ))
      }
    return pre

    }, [])
  }














  getMenuNodes_map = ()=>{
    return menuList.map(item =>{
      if (!item.children) {
        return (

        <Menu.Item key={item.key}>
        <Link to={item.key}><Icon type={item.icon} />
          <span>{item.title}</span>
        </Link>
        </Menu.Item>
        )
      }else {
        return (
       <SubMenu key= {item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
        {/*根据item.children数据的数组，生成<Item>的数组*/}
         {
           item.children.map(cItem => (
             <Menu.Item key={cItem.key}>
               <Link to={cItem.key}>
               <Icon type={cItem.icon} />
               <span>{cItem.title}</span>
               </Link>
             </Menu.Item>
           ))
         }
        </SubMenu>
        )
      }


    })
  }
//componentWillMount：在第一次render()前调用一次，为第一次render准备数据
 // componentWillMount：启动异步任务，异步更新状态，重新render
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {
//获取menu所有的子节点
    const menuNodes = this.menuNodes


//得到请求的路由路径----------------------------
const selectKey = this.props.location.pathname
const openKey = this.openKey
    return (
      <div className='left-nav' to='/home'>
        <Link className='logo' to='./home'>
          <img src={logo} alt=""/>
          <h1>尚硅谷后台</h1>
        </Link>
        {/*一个大的菜单start*/}
        <Menu
          mode="inline"
          theme="dark"
          // 默认选中
          selectedKeys={[selectKey]}
          //是否展开
          defaultOpenKeys={[openKey]}
        >
          {
            menuNodes


          }















          {/*菜单中的每一项start*/}
          {/*<Menu.Item key="1">*/}
            {/*<Icon type="pie-chart" />*/}
            {/*<span>Option 1</span>*/}
          {/*</Menu.Item>*/}
          {/*菜单中的每一项end*/}
      {/*如果一个菜单中还包含多个子菜单就用SubMenu，SubMenu属于Menu.SubMenu ，(Item同理) start      */}
          {/*<SubMenu key="sub1" title={<span><Icon type="wechat" /><span>Navigation One</span></span>}>*/}
            {/*<Item key="5">Option 5</Item>*/}
            {/*<Item key="6">Option 6</Item>*/}
            {/*<Item key="7">Option 7</Item>*/}
            {/*<Item key="8">Option 8</Item>*/}
          {/*</SubMenu>*/}
          {/*如果一个菜单中还包含多个子菜单就用SubMenu，SubMenu属于Menu.SubMenu，(Item同理)  end      */}

        </Menu>
        {/*一个的菜单end*/}
      </div>
    )
  }
}
/*
withRouter():高阶组件
接收的是非路由组件：leftNav
接收返回的是包装产生的新组件：向leftNav中传入history、location，match三个属性



*/
export default withRouter(LeftNav)