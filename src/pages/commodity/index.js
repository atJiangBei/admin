import { Button, Input, Table, message, Select } from 'antd'
import React, { Component } from 'react'
import http from '@/utils/http'
import './index.less'
import { dateTime } from '@/utils/date'
const { Option } = Select
const types = [
  { type: 'shequ', text: '社区' },
  { type: 'baihuo', text: '百货' },
  { type: 'weixiu', text: '维修' },
  { type: 'other', text: '其它' }
]

const jiexiType = type => {
  let str = ''
  types.forEach(item => {
    if (item.type === type) {
      str = item.text
    }
  })
  return str
}
class FormBasicForm extends Component {
  state = {
    total: 1,
    current: 1,
    list: [],
    columns: [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: '卖点',
        dataIndex: 'sellingPoint',
        key: 'sellingPoint'
      },
      {
        title: '销量',
        dataIndex: 'SalesVolume',
        key: 'SalesVolume'
      },
      {
        title: '商品类型',
        dataIndex: 'type',
        key: 'type',
        render(text, currentItem) {
          return (
            <div>
              {(str => {
                return jiexiType(str)
              })(currentItem.type)}
            </div>
          )
        }
      },
      {
        title: '生成时间',
        dataIndex: 'CreatedDate',
        key: 'CreatedDate',
        render(text, currentItem) {
          return (
            <div>
              {(str => {
                return dateTime(str)
              })(currentItem.CreatedDate)}
            </div>
          )
        }
      },
      {
        title: 'banner',
        dataIndex: 'banner',
        key: 'banner',
        render: (text, currentItem) => {
          return (
            <img
              src={currentItem.banner}
              alt=""
              style={{ width: '32px', height: '32px' }}
            />
          )
        }
      },
      {
        title: '详情',
        dataIndex: 'details',
        key: 'details'
      },
      {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        render: (text, currentItem) => {
          return (
            <Button
              onClick={() => {
                this.deleteCurrent(currentItem.key)
              }}
            >
              删除
            </Button>
          )
        }
      }
    ]
  }
  componentDidMount() {
    this.search()
  }
  stateForm(e) {
    const target = e.target
    this.setState({
      [target['name']]: target['value']
    })
  }
  search(params = { name: '', type: '', query: { page: 1 } }) {
    http
      .GET('/IntimateAdmin/query/commodity', {
        params: params
      })
      .then(res => {
        this.setState({
          total: res.total,
          current: res.page,
          list: res.docs
        })
      })
  }
  onSearch() {
    const { queryName, type } = this.state
    this.search({ name: queryName, type: type, query: { page: 1 } })
  }
  deleteCurrent(key) {
    http
      .GET('/IntimateAdmin/delete/commodity', { params: { key } })
      .then(res => {
        message.success('删除成功')
        this.search()
      })
  }
  pageChange(page) {
    this.search({ name: '', type: '', query: { page } })
  }
  typeChange(value) {
    this.setState({
      type: value
    })
  }
  render() {
    const { queryName, type, columns, total, current, list } = this.state
    return (
      <div>
        <div>
          <div className="searchFormList">
            <Input
              value={queryName}
              name="queryName"
              placeholder="输入商品名称"
              onInput={this.stateForm.bind(this)}
            />
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
          <Button
            type="primary"
            icon="search"
            style={{ marginLeft: '20px' }}
            onClick={this.onSearch.bind(this)}
          >
            查询商品
          </Button>
        </div>
        <div style={{ marginTop: '10px' }}>
          <Table
            columns={columns}
            dataSource={list}
            pagination={{
              total,
              current,
              onChange: this.pageChange.bind(this)
            }}
          ></Table>
        </div>
      </div>
    )
  }
}

export default FormBasicForm
