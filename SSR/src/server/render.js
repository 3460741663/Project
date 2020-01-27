import React from 'react';
import { renderToString } from 'react-dom/server'
import Header from '../components/Header'
import { StaticRouter } from 'react-router-dom'
import routes from '../routers'
import { renderRoutes } from 'react-router-config'
import { Provider } from "react-redux";
import { Serverstore } from '../store/index'
export default (req, store, context) => {

  // jsx
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(routes)}</div>
      </StaticRouter>
    </Provider>
  );

  // 渲染完成之后，再获取 css 样式
  let cssStr = context.css.join('\n');
  console.log(cssStr, "______****")
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <style>${cssStr}</style>
  <title>activity_management</title>
</head>
<body>
  <div id="app">${content}</div>
  <script>
    window.__context__  = {state: ${JSON.stringify(store.getState())}}
  </script>
  <script src="/index.js"></script>
</body>
</html>
  `
}