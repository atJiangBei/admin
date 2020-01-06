import React, { Component } from 'react'
import { Button, Input, Modal, Table } from 'antd'
import http from '@/utils/http'
import './index.less'
import { dateTime } from '@/utils/date'
class Appointment extends Component {
  state = {
    name: '',
    user_name: '',
    key: '',
    visible: false,
    orderVis: false,
    current: 1,
    total: 1,
    list: [],
    commodity: {},
    order: {},
    columns: [
      {
        title: '客户名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '微信名',
        dataIndex: 'user_name',
        key: 'user_name'
      },
      {
        title: '订单号',
        dataIndex: 'key',
        key: 'key'
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
        title: '推荐人',
        dataIndex: 'recommender',
        key: 'recommender',
        render(text, currentItem) {
          return (
            <div>
              {currentItem.recommender ? currentItem.recommender : '无'}
            </div>
          )
        }
      },
      {
        title: '商品详情',
        dataIndex: 'commodity',
        key: 'commodity',
        render: (text, currentItem) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.seeCommodity(JSON.parse(currentItem.commodity))
              }}
            >
              详情
            </Button>
          )
        }
      },
      {
        title: '订单详情',
        dataIndex: 'details',
        key: 'details',
        render: (text, currentItem) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.seeOrder(JSON.parse(currentItem.details))
              }}
            >
              详情
            </Button>
          )
        }
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
  seeCommodity(commodity) {
    this.setState({
      commodity,
      visible: true
    })
  }
  seeOrder(order) {
    this.setState({
      order,
      orderVis: true
    })
  }
  search(data = {}, page = 1) {
    http
      .GET('/IntimateAdmin/query/appointment', {
        params: {
          ...data,
          query: { page }
        }
      })
      .then(res => {
        const { total, docs } = res
        this.setState({
          total,
          list: docs
        })
      })
  }
  deleteCurrent(key) {
    http
      .GET('/IntimateAdmin/delete/appointment', { params: { key } })
      .then(res => {
        this.search()
      })
  }
  pageChange(page) {
    this.setState({
      current: page
    })
  }
  stateForm(e) {
    const target = e.target
    this.setState({
      [target['name']]: target['value']
    })
  }
  onSearch() {
    const { name, user_name, key } = this.state
    this.search({
      name,
      user_name,
      key
    })
  }
  render() {
    const {
      name,
      user_name,
      key,
      current,
      total,
      list,
      columns,
      visible,
      commodity,
      orderVis,
      order
    } = this.state
    return (
      <div>
        <Modal
          visible={visible}
          onOk={() => {
            this.setState({
              visible: false
            })
          }}
          onCancel={() => {
            this.setState({
              visible: false
            })
          }}
        >
          <div className="appointment-list">
            <div className="appointment-item">
              <label>商品名称</label>
              <span>{commodity.name}</span>
            </div>
            <div className="appointment-item">
              <label>商品卖点</label>
              <span>{commodity.sellingPoint}</span>
            </div>
            <div className="appointment-item">
              <label>商品价格</label>
              <span>{commodity.price}</span>
            </div>
            <div className="appointment-item">
              <label>创建时间</label>
              <span>
                {(str => {
                  return dateTime(str)
                })(commodity.CreatedDate)}
              </span>
            </div>
            <div className="appointment-item">
              <label>banner图</label>
              <img
                src={commodity.banner}
                alt=""
                style={{ width: '32px', height: '32px' }}
              />
            </div>
          </div>
        </Modal>
        <Modal
          visible={orderVis}
          onOk={() => {
            this.setState({
              orderVis: false
            })
          }}
          onCancel={() => {
            this.setState({
              orderVis: false
            })
          }}
        >
          <div className="appointment-list">
            <div className="appointment-item">
              <label>用户名</label>
              <span>{order.name}</span>
            </div>
            <div className="appointment-item">
              <label>联系电话</label>
              <span>{order.phone}</span>
            </div>
            <div className="appointment-item">
              <label>联系地址</label>
              <span>{order.address}</span>
            </div>
            <div className="appointment-item">
              <label>服务时间</label>
              <span>{order.date}</span>
            </div>
          </div>
        </Modal>
        <div>
          <div className="appointment-search">
            <Input
              name="name"
              placeholder="用户名"
              value={name}
              onInput={this.stateForm.bind(this)}
            />
            <Input
              name="user_name"
              placeholder="用户微信名"
              value={user_name}
              onInput={this.stateForm.bind(this)}
            />
            <Input
              name="key"
              placeholder="订单号"
              value={key}
              onInput={this.stateForm.bind(this)}
            />
          </div>
          <Button
            type="primary"
            icon="search"
            onClick={this.onSearch.bind(this)}
          >
            查询
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

export default Appointment
