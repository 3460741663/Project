# activity_management 前端
## 服务端渲染SSR
目标:客户端访问的第一屏，由服务端渲染，之后的页面变化都是SPA
优势：（1）解决了第一次白屏时间过长的缺点（2）第一次请求就有实质性的内容，SEO优化
>
如下图所示，服务端渲染需要完成Component、Router和Store的同构（开局一张图，内容全靠编）
![](https://user-gold-cdn.xitu.io/2019/12/30/16f56f6d4b980f88?w=775&h=348&f=jpeg&s=19363)
### 1. 创建项目
npm init -y 
>
npm install webpack
>
webpack-cli --save-dev
### 2. 同构html
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