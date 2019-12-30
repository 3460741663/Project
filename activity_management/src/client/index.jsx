import React from 'react'
import ReactDom from 'react-dom'
import Header from '../components/Header'

const App = function() {
  return (
    <Header />
  )
}
{/* 复用已有的html, 负责事件绑定 */}
ReactDom.hydrate(<App />, document.getElementById('app'))