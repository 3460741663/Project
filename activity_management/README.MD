# activity_management 前端
## 服务端渲染SSR
目标:客户端访问的第一屏，由服务端渲染，之后的页面变化都是SPA
优势：（1）解决了第一次白屏时间过长的缺点（2）第一次请求就有实质性的内容，SEO优化
>
如下图所示，服务端渲染需要完成Component、Router和Store的同构（开局一张图，内容全靠编）
![](https://user-gold-cdn.xitu.io/2019/12/30/16f56f6d4b980f88?w=775&h=348&f=jpeg&s=19363)
**创建项目**
>
npm init -y 
>
npm install webpack
>
webpack-cli --save-dev
### 1. 同构html
#### 渲染HTML
* 创建根目录 mkdir ./src
* 创建服务端根目录
cd ./src
mkdir ./server
* 把require引入方式，改成import方式以求风格统一，解决方案: webpack打包成js，直接跑打包后的js就行了
* * 配置webpack.base.js
```js
module.exports = {
  resolve: {
    // 使用 [resolve.extensions] 选项作为文件扩展名来解析，此选项告诉解析器在解析中能够接受哪些扩展名（例如 .js, .jsx）
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /(.js|.jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  }
}
```
* * 配置webpack.server.js
```js
const path = require('path')
const webpackMerge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.js');
const serverConfig = {
  target: 'node',
  mode: 'development',
  entry: './src/server/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build')
  },
  externals: [nodeExternals()]
}
module.exports = webpackMerge(baseConfig, serverConfig)
```
* 配置完成后运行打包命令
webpack --config ./webpack.server.js
* 打包之后运行打包之后的文件bundle.js,此后在项目中，**commonJS和ES6模块化可以混用**了
nodemon bundle.js
* 开启一个express服务,前置条件有一个生产html页面的方法，取名为render
```js
const React = require('react');
const Express = require('express')
const render = require('./render')

const app = new Express();

app.get('*', (req, res) => {
  const html = render();
  res.send(html)
})
app.listen(3000, () => {
  console.log('server is runing http://localhost:3000');
})
```
* render的实现是基于renderToString,它能够将react-dom变成String
* * npm i react-dom 从react-dom/server引入其中的renderToString
* * 增加一个babel配置
```
{
  "presets": [
    "@babel/preset-react"
  ]
}
```
再次打包，跑一下bundle.js，成功获得如下结果，表示html渲染完成，但是此时的点击事件事件是无效的，**服务端渲染页面，客户端绑定事件**
![](https://user-gold-cdn.xitu.io/2019/12/30/16f56a5fe3d28807?w=1920&h=1030&f=png&s=68305)
#### 绑定事件
JS事件放在script标签中，只需要在返回的html中增加一个指向JS事件的script标签
1. 把客户端打包到一个JS文件中
* 入口,使用ReactDom.hydrate复用已有的html,负责事件绑定
```js
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
```
* webpack配置,将JS打包到public目录下
```js
const path = require('path');
const webpackMerge = require('webpack-merge');
const config = require('./webpack.base.js');
const clientConfig = {
  mode: 'development',
  entry: './src/client/index.jsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  }
}
module.exports = webpackMerge(config, clientConfig);
```
* 安装npm install npm-run-all小工具，并在package.json中配置执行命令,即监听webpack.server.js和webpack.client.js的变化，如任一变化则重新打包一下,同时使用nodemon运行bundle.js，监听它的build事件
```js
"dev": "npm-run-all --parallel dev:**",
"dev:start": "nodemon --watch build --exec node \"./build/bundle.js\"",
"dev:build:server": "webpack --config ./webpack.server.js --watch",
"dev:build:client": "webpack --config ./webpack.client.js --watch"
```
* 增加script标签，把前端访问资源指向打包文件
```js
<div id="app">${renderToString(App)}</div>
<script src="/index.js"></script>
```
/index.js这个资源其实指的就是client打包过后的文件。所以，需要接到请求之前**改变资源文件的指向**
```js
app.use(express.static('public'))
```
完成上述步骤后，事件绑定就已经完成了。至此，已经完成的html渲染和事件绑定，即Component的同构

![](https://user-gold-cdn.xitu.io/2019/12/30/16f5704f198d701c?w=1920&h=1030&f=png&s=72221)
### 2. 同构路由
* 建路由表以及需要的页面
```js
export default [
  {
    path: '/',
    component: App,
    routes: [
      {
        path: '/home',
        component: Home,
        exact: true
      },
      {
        path: '/login',
        component: Login,
      }
    ]
  }
]
```
* 客户端用BrowserRouter管理路由
```js
<BrowserRouter>
  <div>{ renderRoutes(routers) }</div>
</BrowserRouter>
```
* 服务端用StaticRoute管理路由
```js
<StaticRouter location={req.path}>
  <div>{renderRoutes(routes)}</div>
</StaticRouter>
```
完成上述步骤后，就完成的路由的同构即首屏加载的内容是已经生成好的html,且匹配路由
![](https://user-gold-cdn.xitu.io/2020/1/2/16f669ac2ea6d208?w=1920&h=1030&f=png&s=100580)
### 3. 同构Store
#### redux
redux的流程:创建一个全局对象，对它的访问和修改只能通过特定的方法实现。

![](https://user-gold-cdn.xitu.io/2020/1/8/16f855087983c713?w=1154&h=796&f=jpeg&s=127122)
1. 用provide包裹整个#app, app即整个项目。然后再provide上挂一个store,此后app的所有子组件均可访问到变量，创建好了这个**全局对象**
```js
<Provider store={store}>
  <StaticRouter location={req.path}>
   <div>{renderRoutes(routes)}</div>
  </StaticRouter>
</Provider>
```
2. 创建这个全局对象:
- 首先它应该是一个reducer，开始访问或事件会修改它。reducer会有一个默认的对象和一个抛出的方法，调用这个方法时这个action需要是一个字符串匹配下面的switch，且必须要是唯一的，所以应当用一个文件管理这些case字符串
```js
import constant from '../../store/constant'
const defaultState = {
  activity: []
};
export const activityReducer = (state = defaultState, actions) => {
  switch(actions.type){
    case constant.ADD_ACTIVITY:
      return { ... state, activity:actions.activity };
    case constant.REMOVE_ACTIVITY:
      return { ... state, activity:actions.activity };
    default: return state
  }
}
```
- reducer可以有许多，来自不同的地方，但是一般统一起来放在要给store里面
```js
import { combineReducers } from 'redux'
import * as activityReducer from '../pages/activitiesSquare/activityListReducer'
export default combineReducers(activityReducer)
```
- 最后再将这个reducer变成store就完成了,至此store已经创建好了
```js
import { createStore } from 'redux'
import { combineReducers } from './reducer'
export default store = () => {
  return createStore(combineReducers)
}
```
- 使用store: 访问和修改
1. 使用Provide包裹抛出store自不必说，让它的子节点，孙子节点都能访问到这个props，用这一对标签包裹app让整个项目都能获取到这个store
```js
<Provider store={store()}>
</Provider>
```
2. 对react-redux的使用，即connect，将store中的数据取下映射成props
```js
const mapStateToProps = (state) => {
  console.log(state);
  return {
    activityList: state.activityReducer.activity
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(activitySquare);
```
未完。。。
