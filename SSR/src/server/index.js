// 模块引入方式问题，babel解决
import react from 'react';
import express from 'express';
import render from './render'
// const React = require('react');
// const Express = require('express')
// const render = require('./render')
import { Serverstore } from '../store/index'
import { matchRoutes } from 'react-router-config'
import routes from '../routers'

const app = new express();

// publi 前端打包后访问的静态资源
app.use(express.static('public'))
app.get('*', (req, res) => {
  // render之前，保证redux中有数据，渲染出来的页面 就是带有数据的HTML
  // 1. 访问当前url命中的所有组件
  // 2. 拿到组件上面的loadData
  // 3. dispatch
  // 4. 渲染
  
  const matchRouters = matchRoutes(routes, req.path);
  // 创建一个store,然后往里面填充数据。这些数据就是被这个路由命中的所有组件的所有数据，包括dispatch之后的数据。所以，需要收集到所有的loadData,并等待它执行完成。
  const store = Serverstore();
  // 收集所有的promise
  let promises = [];
  matchRouters.forEach(mRouter => {
    if(mRouter.route.loadData){
      promises.push(mRouter.route.loadData(store))
    }
  })
  // 等待执行完成后才render
  Promise.all(promises)
  .then((resArray) => {
    
    let context = {css: []};
    const html = render(req, store, context);
    res.send(html);
  })
  .catch(err => {
    console.log('服务端出错了', err);
  })
})
app.listen(3000, () => {
  console.log('server is runing http://localhost:3000');
})