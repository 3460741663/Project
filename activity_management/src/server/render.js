import React from 'react';
import { renderToString } from 'react-dom/server'
import Header from '../components/Header'
import { StaticRouter } from 'react-router-dom'
import routes from '../routers'
import { renderRoutes } from 'react-router-config'
import { Provider } from "react-redux";
import { Serverstore } from '../store/index'
export default (req, store) => {

  // cssArr  收集每一个组件引入的样式
  let context = { cssArr: [] };
  // jsx
  const App = (
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(routes)}</div>
      </StaticRouter>
    </Provider>
  )
  // 渲染完成之后，再获取 css 样式
  let cssStr = context.cssArr.join('\n');
  // console.log(cssArr)
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app">${renderToString(App)}</div>
  <script>
    window.__context__  = {state: ${JSON.stringify(store.getState())}}
  </script>
  <script src="/index.js"></script>
</body>
</html>
  `
}