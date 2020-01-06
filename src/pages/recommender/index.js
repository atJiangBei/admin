import React, { useState, useEffect } from 'react'
import { Spin, Input, Button, Table, message } from 'antd'
import './index.less'
import http from '@/utils/http'
import { dateTime } from '@/utils/date'

//name,page,limit

export default () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(1)
  const query = (options = {}, current = 1) => {
    setLoading(true)
    http
      .GET('/IntimateAdmin/query/recommender', {
        params: {
          query: {
            page: current
          },
          ...options
        }
      })
      .then(
        res => {
          setListData(res.docs)
          setCurrent(res.page)
          setTotal(res.total)
          setName('')
          setLoading(false)
        },
        err => {
          setLoading(false)
        }
      )
  }
  useEffect(() => {
    query()
  }, [])

  const onInput = e => {
    setName(e.target.value)
  }
  const deleteOne = key => {
    for (let i = 0; i < listData.length; i++) {
      const item = listData[i]
      if (item.key === key) {
        listData.splice(i, 1)
      }
    }
  }
  const deleteCurrent = key => {
    setLoading(true)
    http.GET('/IntimateAdmin/delete/recommender', { params: { key } }).then(
      res => {
        deleteOne(key)
        message.warning('删除成功')
        setLoading(false)
      },
      err => {
        setLoading(false)
      }
    )
  }
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '联系地址',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '创建时间',
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
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      render(text, currentItem) {
        return (
          <Button
            onClick={e => {
              deleteCurrent(currentItem.key)
            }}
          >
            删除
          </Button>
        )
      }
    }
  ]
  const add = () => {
    if (!name) {
      message.warning('请输入姓名')
      return
    }
    http
      .GET('/IntimateAdmin/add/recommender', {
        params: {
          name: name
        }
      })
      .then(res => {
        query()
      })
  }
  const search = () => {
    query({ name })
  }
  const pageChange = page => {
    query({ query: { page } })
  }
  return (
    <div>
      <Spin spinning={loading} size="large">
        <div className="content">
          <Input
            placeholder="推荐人姓名"
            maxLength={4}
            value={name}
            onInput={onInput}
          />
          <Button
            type="primary"
            icon="plus"
            onClick={add}
            style={{ marginLeft: '20px' }}
          >
            新增推荐人
          </Button>
          <Button
            type="primary"
            icon="search"
            onClick={search}
            style={{ marginLeft: '20px' }}
          >
            搜索推荐人
          </Button>
        </div>
        <div style={{ paddingTop: '20px' }}>
          <Table
            dataSource={listData}
            columns={columns}
            pagination={{ current, total, onChange: pageChange }}
          />
        </div>
      </Spin>
    </div>
  )
}
