// 模块引入方式问题，babel解决
import react from 'react';
import express from 'express';
import render from './render'
// const React = require('react');
// const Express = require('express')
// const render = require('./render')

const app = new express();

// publi 前端打包后访问的静态资源
app.use(express.static('public'))
app.get('*', (req, res) => {
  const html = render(req);
  res.send(html)
})
app.listen(3000, () => {
  console.log('server is runing http://localhost:3000');
})