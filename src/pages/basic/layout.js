import React from 'react'
import './layout.less'
import { Layout, Menu, Icon } from 'antd'
import logo from '@/assets/icons/logo.svg'
import ContentRouter from '@/routers/contentRouter'
import http from '@/utils/http'
const { Header, Sider, Content } = Layout

const sliderList = [
  {
    text: '预约记录',
    icon: 'smile',
    path: '/index/appointment'
  },
  {
    text: '商品录入',
    icon: 'smile',
    path: '/index/addCommodity'
  },
  {
    text: '商品列表',
    icon: 'smile',
    path: '/index/commodity'
  },
  {
    text: '推荐人录入',
    icon: 'smile',
    path: '/index/recommender'
  },
  {
    text: '图片上传',
    icon: 'cloud-upload',
    path: '/index/uploadImg'
  }
]
class LayoutContainer extends React.Component {
  state = {
    collapsed: false,
    user: {}
  }
  componentDidMount() {
    // axios
    //   .post('/IntimateAdmin/register', {
    //     name: '江南北',
    //     password: 'jnb123456',
    //     headPortrait: 'http://127.0.0.1/uploadimgs/smalldog1577698300222.jpg'
    //   })
    //   .then(res => {
    //     console.log(res)
    //   })
    http
      .POST('/IntimateAdmin/loginStatus', {
        data: {}
      })
      .then(data => {
        this.setState({
          user: data
        })
      })
      .catch(e => {
        console.log(48, e)
        this.props.history.push('/signin')
      })
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  goTo = path => {
    this.props.history.push(path)
  }
  render() {
    const { collapsed, user } = this.state
    return (
      <div className="admin-container">
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="admin-menu-logo">
              <img
                src={logo}
                alt="logo"
                style={{ width: '32px', height: '32px' }}
              />
              {!collapsed && <span className="admin-menu-text">贴心居</span>}
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              {sliderList.map(slider => {
                return (
                  <Menu.Item
                    key={slider.text}
                    onClick={() => {
                      this.goTo(slider.path)
                    }}
                  >
                    <Icon type={slider.icon} />
                    <span>{slider.text}</span>
                  </Menu.Item>
                )
              })}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <div className="admin-header-container">
                <Icon
                  className="trigger"
                  style={{ fontSize: '20px' }}
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
                {user && (
                  <div className="admin-header">
                    <img src={user.headPortrait} alt="" />
                    <span>{user.name}</span>
                  </div>
                )}
              </div>
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280
              }}
            >
              <div className="admin-content">
                <ContentRouter></ContentRouter>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default LayoutContainer
