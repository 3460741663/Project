## activity_management 项目准备
项目说明：在已有后端项目的基础上，进行前端的业务开发。本项目的功能在于管理学校社团活动，简化学生在活动申请、审核、创建以及报名参与一系列流程。文章将按照作者的开发进度更新，一边开发一边记录
>
目标:客户端访问的第一屏，由服务端渲染，之后的页面变化都是SPA
优势：（1）解决了第一次白屏时间过长的缺点（2）第一次请求就有实质性的内容，SEO优化
>
如下图所示，服务端渲染需要完成Component、Router和Store的同构
![](https://user-gold-cdn.xitu.io/2019/12/30/16f56f6d4b980f88?w=775&h=348&f=jpeg&s=19363)
**创建项目**
>
当前为一个node项目，通过webpack的配置让它兼容react的语法，简化开发
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
* #### redux流程
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
2. 对react-redux的使用，即connect，将store中的数据和dispatch映射到props上
```js
const mapStateToProps = (state) => {
  console.log(state);
  return {
    activityList: state.activityReducer.activity
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(activitySquare);
```
3. 另外，dispatch除了可以提交一个纯对象外，还可以dispatch一个方法，此时还需要在创建store时引入中间件thunk
```js
function getActivityList() {
  return (dispatch) => {
    return axios.get('http://localhost:3003/mapi/comment').then(res => {
      const data = res.data.list;
      console.log(data);
      dispatch({
        type: 'ACtIVITY_LIST',
        activity: data
      })
    })
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getActivityList: () => {
      dispatch(getActivityList())
    }
  }
}
```
 * #### 获得服务端Store 
>
流程是先创建一个store,然后往里面填充数据。这些数据就是被这个路由命中的所有组件的所有数据，包括dispatch之后的数据。所以，需要收集到所有的loadData,并等待它执行完成。
 1. 命中当前路径下的所有组件
```js
const matchRouters = matchRoutes(routes, req.path);
```
2. 执行当中的所有请求,完成所有的loadData。获取组件上的数据填充方法，过程：
* * 把数据填充的方法loadData挂在组件上
```js
Home.loadData = function(store) {
  // loadData的起点
  // 这里是Promis则所有的loadData都是Promis， Promise.all
  // getCommentList是一个action
  return  store.dispatch(getCommentList())
}
```
* * 从被命中的组件上取下loadData方法执行,执行其中的请求就是填充redux中的数据,即完成所有的dispatch
```js
  matchRouters.forEach(mRouter => {
    if(mRouter.route.loadData){
      promises.push(mRouter.route.loadData(store))
    }
  })
```
  3. 等待loadData执行结束,此时store已经有数据了
```js
Promise.all(promises)
  // promise完成
  .then(resArray => {
    // console.log(store)
    const html = render(req, store);
    res.send(html)
  })
```
4. 等待所有请求执行完毕后把有数据的store传过去，再渲染页面
 * #### 服务端和客户端store统一
 把服务端的数据以字符串的形式塞进html文本中
```js
<script>
    window.__context__  = {state: ${JSON.stringify(store.getState())}} 
</script>
```
客户端获取数据时，从hmtl中拿到值
```js
export const Clientstore = () => {
  // store的默认值，把数据JSON.Stringfy放在了script中
  const defaultStore = window.__context__ || {};
  return createStore(
    reduce,
    defaultStore.state,
    applyMiddleware(thunk));
}
```
服务端渲染完毕！
![](https://user-gold-cdn.xitu.io/2020/1/28/16feb8c02e38df85?w=1920&h=1030&f=png&s=141792)
源码Git地址：https://github.com/3460741663/Project/tree/master/activity_management
使用说明:该项目是一个完整的完成了SSR的项目，先使用node跑mock-server下的js程序(模拟数据请求的服务器),然后npm run dev跑项目
>
### 4. Css服务端渲染
1. 新建css文件，引入并使用
2. 配置webpack,让webpack支持编译css文件,需要`npm install style-loader css-loader --D`俩个工具
```js
rules: [{
  test: /\.css?$/,
  use: ['style-loader', {
    loader: 'css-loader',
    options: {
      modules: true
    }
  }]
}]
```
配置好之后就就可以让css生效了
3. 服务端css加载
* 使用工具`npm install -D isomorphic-style-loader`,给css文件添加_getCss()方法，查看源码后得知返回css文件内容tostring后的结果
* 配置服务端的webpack
```js
rules: [{
  test: /\.css?$/,
  use: ['isomorphic-style-loader', {
    loader: 'css-loader',
    options: {
      modules: true
    }
  }]
}]
```
* staticRouter提供一个钩子变量context
>会以props的形式在组件之间传递，也可以在渲染的过程中拿到它。所以，生命一个空数组让它在组件内走一遭之后再把内容沿途需要的css拼起来，再返回的内容里插入style标签。
```js
let context = { css: [] }
// context从外界传入
<StaticRouter location={req.path} context={context}>
    <div>
        {renderRoutes(routes)}
    </div>
</StaticRouter>
```
* 我们只在服务端渲染的使用使用了staticRouter，所以可以用来判断是否为服务端渲染环境
```js
componentWillMount() {
  // 判断是否为服务端渲染环境
  // context是props,也可以被外界取到
  // 通过context收集匹配到当前路由的所有组件的css
  if (this.props.staticContext) {
    this.props.staticContext.css.push(styles._getCss())
  }
}
```
* 把获得的css以style标签插入到返回的html中即可
```js
// 拼接收集到的css
const cssStr = context.css.length ? context.css.join('\n') : '';
/ 在返回的html字符串插入style标签
<style>${cssStr}</style>
```
达到如下效果，说明css的服务端渲染成功了
![](https://user-gold-cdn.xitu.io/2020/1/31/16ffb826c386855b?w=1920&h=1030&f=png&s=141476)
#### 利用高阶组件优化css服务端渲染
> * 高阶组件首先自己是一个组件，且接受一个组件作为参数，作用就是把这个参数组件增强成为另外一个组件。扩充组件的作用，提高了代码的复用性，减少重复代码；
> * 控制组件的渲染逻辑，比如:鉴权;
> * 生命周期捕获/劫持：借助父组件子组件生命周期规则捕获子组件的生命周期，常见case：打点。
这里使用的就是生命周期捕获，父组件捕获子组件的componentWillMount生命周期，达到收集css的目的
```js
import React, { Component } from 'react';
//函数返回组件
export default (DecoratedComponent, styles) => {
  return class NewComponent extends Component {
    componentWillMount() {
      if (this.props.staticContext) {
        // styles._getCss来自isomorphic-style-loader
        this.props.staticContext.css.push(styles._getCss());
        console.log(this.props.staticContext)
      }
      
    }
    render() {
      return <DecoratedComponent {...this.props} />
    }
  };
}
```
```js
const activity = connect(mapStateToProps, mapDispatchToProps)(withStyles(activitySquare, styles));
activity.loadData = (store) => {
  return store.dispatch(getActivityList())
};
export default activity;
```
使用是时候需要注意的是，这里有俩个高阶组件connect,自定义高阶组件withStyles他俩的包裹顺序以及loadData需要挂载在被导出的组件上，不然路由表出错
```js
{
  path: '/activitySquare',
  component: activitySquare,
  loadData: activitySquare.loadData,
}
```
SSR完成了
## 业务开发
### 写在业务开发前
#### 跨域错误
产生跨域问题的罪魁祸首是浏览器同源策略，当协议、子域名、主域名、端口号中任意一个不相同时，都算作不同域，不同域之间的网络请求就会触发跨域问题。跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。
```js
ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
ctx.set('Access-Control-Allow-Methods', 'POST, GET');
ctx.set('Access-Control-Allow-Headers', 'x-custom, Content-Type');
// 允许 是否发送 cookie ... 凭证
ctx.set('Access-Control-Allow-Credentials', true);
```
后端设置上述响应消息头即可
#### axios的封装
在使用axios进行异步操作时，可能会遇到以下情况：
* 对一个按钮频繁点击，发送多次请求
* axios的规范写法中：`axios.post(url, data).then(res=>{}).catch(err=>{})`
复制代码这里我们发现我们每一次写的时候，都需要写.catch(err=>{}),会造成代码的冗余
>
所以可以使用拦截器来对axios进行封装，如下：
```js
// 对axios的封装
let fetch = axios.create({
    baseURL: 'http://127.0.0.1:8090', // 这里是后端服务器地址
    credentials: 'include',// 即便是跨域，也携带cookie
    timeout: 5000 // request timeout
})
// 添加请求拦截器
fetch.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
        if (typeof (config.data) !== 'string' && config.headers['Content-Type'] !== 'multipart/form-data') {
            config.data = qs.stringify(config.data)
        }
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
fetch.interceptors.response.use(response => {
    // 对响应数据做点什么
    // 把响应字符串转换成JSON数据格式（后端数据请求造的孽）
    var reg = /([\w-.]+)/g;
    var temp = response.data.replace(reg, '"$1"')
    var result = temp.replace(/=/g, ":")
    response.data = JSON.parse(result);
    return response;
}, error => {
    // 错误响应应该
    if (error.response) {
        if (error.response.status === 500) {
            console.log('服务器错误，请联系管理员处理')
        }
        return Promise.reject(error.response.data)
    } else {
        return Promise.reject(error)
    }
})
```
#### 数据结构不兼容，正则来解决
1. 多方原因导致后端传递过来的数据并不能直接使用，需要对数据进行处理，恰好可以在上述拦截器中使用，即对响应数据的处理。
2. 后端传递来的数据`[{duration=120, start_time=2019-12-19}]`。它并不是规范的JSON，无法使用JSON.parse来解析，需要经过一番处理变成`[{"duration":"120","start_time":"2019-12-19"}]`简单[学习](https://juejin.im/post/5965943ff265da6c30653879)之后，得到如下正则来处理
```js
var reg = /([\w-.]+)/g;
var temp = response.data.replace(reg, '"$1"')
var result = temp.replace(/=/g, ":")
response.data = JSON.parse(result);
```
>对上述正则的简单解释。用//包裹的表达式称为正则字面量，其中是对需要匹配的模式的一种描述。[abc]表示这一个字符可以选择a,b,c之一、\w是表示所有大小写字符数字和下划线、+是量词即形容出现的次数至少一次、最后一个g表示全局范围。$1表示正则中第一个小括号(最外面、最左边的是一)匹配到的内容，以此类推$2、$3,在千分位表示的面试题可以使用恰到好处。说明，replace函数的第二个参数可以是一个函数，参数表示所匹配到的字符串。
#### 使用Ant Design来搭页面,不支持（暂未按需加载）
1. 在返回的html中插入link标签，加载cdn的样式库`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.7/antd.css" >`
2. 安装、引入即可使用
> 并没有实现按需加载，觉得可以使用treeshaking
### 具体业务实现
