import React from 'react'
import { HashRouter, Route, Redirect } from 'react-router-dom'
import Loading from '@/pages/loading'
import loadable from 'react-loadable'

const SignInComponent = loadable({
  loader: () => import('@/pages/basic/signin.js'),
  loading: Loading
})
const LayoutComponent = loadable({
  loader: () => import('@/pages/basic/layout.js'),
  loading: Loading
})
const RegisterComponent = loadable({
  loader: () => import('@/pages/basic/register.js'),
  loading: Loading
})

const IndexRouter = () => {
  return (
    <HashRouter>
      <Route
        path="/"
        exact
        render={() => (
          <>
            <Redirect to="/index" />
          </>
        )}
      />
      <Route path="/signin" exact component={SignInComponent}></Route>
      <Route path="/register" exact component={RegisterComponent}></Route>
      <Route path="/index" component={LayoutComponent}></Route>
    </HashRouter>
  )
}

export default IndexRouter
