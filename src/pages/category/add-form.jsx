import React, {Component} from 'react'
import {Form, Input, Select} from 'antd'
import PropTypes from 'prop-types'

const Option = Select.Option
//用来分类名称的form组件
class AddForm extends Component {

  static propTypes = {
    categories:PropTypes.array.isRequired,
    parentId:PropTypes.string.isRequired,
    setForm:PropTypes.func.isRequired

  }
componentWillMount() {
    //将当前prop中的form交给父组件
  this.props.setForm(this.props.form)

}

  render() {
    const {getFieldDecorator} = this.props.form
    const{categories,parentId} = this.props
    return (
      <Form>
        <Form.Item>
      {
        //标识名称categoryName，用来取数据
        getFieldDecorator('parentId',{
          initialValue:parentId


    })(
      <Select>
        <Option value='0'>一级分类</Option>
        {
          categories.map(c => <Option  key={c._id}value={c._id}>{c.name}</Option>)
        }
      </Select>
    )
  }
      </Form.Item>





        <Form.Item>
          {
            //标识名称categoryName，用来取数据
            getFieldDecorator('categoryName',{
              //初始值文本
              initialValue:'',//初始值
            })(
              <Input type='text' placeholder='请输入分类的名称'/>
            )
          }


        </Form.Item>

      </Form>
    )
  }
}


export default  Form.create()(AddForm)