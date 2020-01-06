import React, { useState, useEffect } from 'react'
import { Spin, Button, Icon, Table, message } from 'antd'
import http from '@/utils/http'
import { dateTime } from '@/utils/date'
import './index.less'
const maxSize = 1024 * 500
export default () => {
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(1)
  const [listData, setList] = useState([])
  const search = function(params = { name: '', query: { page: 1 } }) {
    setLoading(true)
    http
      .GET('/IntimateAdmin/query/img', {
        params: params
      })
      .then(res => {
        setLoading(false)
        setCurrent(res.page)
        setTotal(res.total)
        setList(res.docs)
      })
      .catch(e => {
        setLoading(false)
      })
  }
  useEffect(() => {
    search()
  }, [])
  const deleteIimg = options => {
    setLoading(true)
    http
      .GET('/IntimateAdmin/delete/img', {
        params: { key: options.key, name: options.name }
      })
      .then(res => {
        setLoading(false)
        search()
      })
      .catch(e => {
        setLoading(false)
      })
  }
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render(text, currentItem) {
        return (
          <div style={{ maxWidth: '100px', wordWrap: 'warp' }}>
            {currentItem.name}
          </div>
        )
      }
    },
    {
      title: '路径',
      dataIndex: 'url',
      key: 'url',
      render(text, currentItem) {
        return (
          <div style={{ maxWidth: '120px', wordWrap: 'warp' }}>
            {currentItem.url}
          </div>
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'date',
      key: 'date',
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
      title: '缩略图',
      dataIndex: 'dom',
      key: 'dom',
      render(text, currentItem) {
        return (
          <div>
            <img style={{ width: '42px' }} src={currentItem.url} alt="" />
          </div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render(text, currentItem) {
        return (
          <Button
            onClick={() => {
              deleteIimg(currentItem)
            }}
          >
            删除
          </Button>
        )
      }
    }
  ]
  const pageChange = function(page) {
    search({ name: '', query: { page } })
  }
  const changeUpload = function(event) {
    const target = event.target
    const file = event.target.files
    const formData = new FormData()
    let img = file && file[0]
    if (img.size > maxSize) {
      message.warn('图片大小不得超过500kb')
      return
    }

    formData.append('img', img)
    setLoading(true)
    target.value = ''
    http
      .POST('/IntimateAdmin/upload/img', {
        data: formData
      })
      .then(res => {
        setLoading(false)
        search()
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <Spin spinning={loading} size="large">
        <div className="admin-uploadContainer">
          <Button type="primary">
            <Icon type="upload" /> 点击上传
          </Button>
          <input
            type="file"
            onChange={changeUpload}
            accept=".png, .jpg, .jpeg"
          />
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={listData}
            pagination={{
              current: current,
              total: total,
              onChange: pageChange
            }}
          />
        </div>
      </Spin>
    </div>
  )
}
