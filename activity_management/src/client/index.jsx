import React from 'react'
import ReactDom from 'react-dom'
import Header from '../components/Header'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import routers from '../routers'
import { store } from '../store/index'

const App = function() {
  return (
    <Provider store={store()}>
      <BrowserRouter>
        <div>{ renderRoutes(routers) }</div>
      </BrowserRouter>
    </Provider>
  )
}
{/* 复用已有的html, 负责事件绑定 */}
ReactDom.hydrate(<App />, document.getElementById('app'))