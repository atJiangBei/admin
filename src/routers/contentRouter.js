import React from 'react'
import loadable from 'react-loadable'
import { Route } from 'react-router-dom'
import Loading from '@/pages/loading'
const uploadImgComponent = loadable({
  loader: () => import('@/pages/uploadImg'),
  loading: Loading
})
const recommenderComponent = loadable({
  loader: () => import('@/pages/recommender'),
  loading: Loading
})
const commodityComponent = loadable({
  loader: () => import('@/pages/commodity'),
  loading: Loading
})
const appointmentComponent = loadable({
  loader: () => import('@/pages/appointment'),
  loading: Loading
})

const addCommodityComponent = loadable({
  loader: () => import('@/pages/addCommodity'),
  loading: Loading
})
const ContentRouter = () => {
  return (
    <>
      <Route path="/index/uploadImg" component={uploadImgComponent}></Route>
      <Route path="/index/recommender" component={recommenderComponent}></Route>
      <Route path="/index/commodity" component={commodityComponent}></Route>
      <Route path="/index/appointment" component={appointmentComponent}></Route>
      <Route
        path="/index/addCommodity"
        component={addCommodityComponent}
      ></Route>
    </>
  )
}

export default ContentRouter
