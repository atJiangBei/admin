import React, { Component } from 'react'
import { message } from 'antd'
import './register.less'
import http from '@/utils/http'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      RegistrationCode: '',
      password: '',
      surepassword: ''
    }
  }
  goSignin() {
    this.props.history.push('/signin')
  }
  sure() {
    const { name, RegistrationCode, password, surepassword } = this.state
    if (!name) {
      return message.warn('请输入用户名', 1)
    }
    if (!RegistrationCode) {
      return message.warn('请输入注册码', 1)
    }
    if (!password) {
      return message.warn('请输入密码', 1)
    }
    if (!surepassword) {
      return message.warn('请确认密码', 1)
    }
    if (password !== surepassword) {
      return message.warn('两次密码必须相同', 1)
    }
    const hide = message.loading('请稍等···')
    const sendData = { name, RegistrationCode, password }
    http
      .POST('/IntimateAdmin/register', {
        data: sendData
      })
      .then(res => {
        message.success('注册成功，即将跳转登陆页面')
        setTimeout(() => {
          this.props.history.push('/signin')
        }, 500)
        hide()
      })
  }
  render() {
    return (
      <div id="register">
        <div className="register">
          <p className="register-title">注册</p>
          <div className="register-name">
            <label>用户名：</label>
            <input
              type="text"
              maxLength="11"
              placeholder="请输入用户名"
              value={this.state.name}
              onChange={e => {
                this.setState({ name: e.target.value })
              }}
            />
          </div>
          <div className="register-code">
            <label>注册码：</label>
            <input
              type="text"
              value={this.state.RegistrationCode}
              maxLength="64"
              placeholder="请输入注册码"
              onChange={e => {
                this.setState({ RegistrationCode: e.target.value })
              }}
            />
          </div>
          <div className="register-password">
            <label>密码：</label>
            <input
              type="password"
              maxLength="24"
              value={this.state.password}
              placeholder="请输入密码"
              onChange={e => {
                this.setState({ password: e.target.value })
              }}
            />
          </div>
          <div className="register-password-sure">
            <label>确认密码：</label>
            <input
              type="password"
              maxLength="24"
              value={this.state.surepassword}
              placeholder="请再次输入密码"
              onChange={e => {
                this.setState({ surepassword: e.target.value })
              }}
            />
          </div>

          <button className="btn" onClick={this.sure.bind(this)}>
            确认注册
          </button>
          <p className="register-signin">
            已有账号，立即<span onClick={this.goSignin.bind(this)}>登录</span>
          </p>
        </div>
      </div>
    )
  }
}
