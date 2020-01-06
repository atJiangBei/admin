import React from 'react'
import { Spin } from 'antd'
import './index.less'

const Loading = props => {
  return (
    <div className="admin-loading">
      <Spin size="large"></Spin>
    </div>
  )
}

export default Loading
