import React, { Component } from 'react'
import { Button, Spin, Input, message, Select, Icon } from 'antd'
import http from '@/utils/http'
import './index.less'
const { Option } = Select
const maxSize = 1024 * 500
const types = [
  { type: 'shequ', text: '社区' },
  { type: 'baihuo', text: '百货' },
  { type: 'weixiu', text: '维修' },
  { type: 'other', text: '其它' }
]
class AddCommodity extends Component {
  state = {
    loading: false,
    cname: '',
    banner: '',
    price: '',
    sellingPoint: '',
    details: '',
    type: '',
    imgdetails: {}
  }
  check() {
    const { cname, price, sellingPoint, type, banner } = this.state
    if (!cname) {
      return '请输入商品名称'
    }
    if (!price) {
      return '请设置商品价格'
    }
    if (!sellingPoint) {
      return '请输入商品卖点'
    }
    if (!type) {
      return '请设置商品类型'
    }
    if (!banner) {
      return '请上传banner图'
    }
    return true
  }
  submit = e => {
    const result = this.check()
    if (result !== true) {
      message.success(result)
      return
    }
    const { cname, banner, price, sellingPoint, details, type } = this.state
    const data = { name: cname, price, sellingPoint, type, banner, details }
    http
      .POST('/IntimateAdmin/add/commodity', {
        data
      })
      .then(res => {
        this.reset()
        message.success('提交成功')
      })
  }
  reset() {
    this.setState({
      cname: '',
      banner: '',
      price: '',
      sellingPoint: '',
      details: '',
      type: '',
      imgdetails: {}
    })
  }
  stateForm(e) {
    const target = e.target
    this.setState({
      [target['name']]: target['value']
    })
  }
  stateAreaForm(e) {
    const target = e.target
    this.setState({
      [target['name']]: target['value']
    })
  }
  changeUpload(event) {
    const target = event.target
    const file = event.target.files
    const formData = new FormData()
    let img = file && file[0]
    formData.append('img', img)
    if (img.size > maxSize) {
      message.warn('图片大小不得超过500kb')
      return
    }
    target.value = ''
    this.setState({
      loading: true
    })
    http
      .POST('/IntimateAdmin/upload/img', {
        data: formData
      })
      .then(res => {
        this.setState({
          loading: false,
          imgdetails: res,
          banner: res.url
        })
      })
      .catch(() => {
        this.setState({
          loading: false
        })
      })
  }
  deleteImg() {
    const { imgdetails } = this.state
    http
      .GET('/IntimateAdmin/delete/img', {
        params: { key: imgdetails.key, name: imgdetails.name }
      })
      .then(res => {
        message.success('删除成功')
        this.setState({
          imgdetails: {},
          banner: ''
        })
      })
  }
  typeChange(value) {
    this.setState({
      type: value
    })
  }
  render() {
    const {
      cname,
      banner,
      price,
      sellingPoint,
      details,
      loading,
      type
    } = this.state
    return (
      <div>
        <Spin spinning={loading}>
          <div className="add-commodity-container">
            <div className="add-commodity-formlist">
              <div className="add-commodity-formitem">
                <label>商品名称</label>
                <Input
                  addonBefore={<Icon type="smile" />}
                  placeholder="商品名称"
                  value={cname}
                  name="cname"
                  onInput={this.stateForm.bind(this)}
                />
              </div>
              <div className="add-commodity-formitem">
                <label>商品价格</label>
                <Input
                  placeholder="商品价格"
                  addonBefore={<Icon type="pay-circle" />}
                  value={price}
                  name="price"
                  onInput={this.stateForm.bind(this)}
                />
              </div>
              <div className="add-commodity-formitem">
                <label>商品卖点</label>
                <Input
                  placeholder="商品卖点"
                  addonBefore={<Icon type="smile" />}
                  value={sellingPoint}
                  name="sellingPoint"
                  onInput={this.stateForm.bind(this)}
                />
              </div>
              <div className="add-commodity-formitem">
                <label>商品类型</label>
                <Select
                  placeholder="选择商品类型"
                  onChange={this.typeChange.bind(this)}
                  value={type}
                >
                  {types.map(item => {
                    return (
                      <Option value={item.type} key={item.type}>
                        {item.text}
                      </Option>
                    )
                  })}
                </Select>
              </div>
            </div>
            <div className="add-commodity-formitem">
              <label>bannert图</label>
              {banner && (
                <div className="add-commodity-upload">
                  <img src={banner} alt="" />
                  <div
                    className="commodity-banner-delete"
                    onClick={this.deleteImg.bind(this)}
                  ></div>
                </div>
              )}
              {!banner && (
                <div className="add-commodity-upload">
                  <Icon type="plus" />
                  <input
                    type="file"
                    onChange={this.changeUpload.bind(this)}
                    accept=".png, .jpg, .jpeg"
                  />
                </div>
              )}
            </div>
            <div className="add-commodity-formitem">
              <label>商品详情</label>
              <Input.TextArea
                value={details}
                name="details"
                onInput={this.stateForm.bind(this)}
              />
            </div>
            <Button type="primary" onClick={this.submit}>
              提交
            </Button>
          </div>
        </Spin>
      </div>
    )
  }
}

export default AddCommodity
