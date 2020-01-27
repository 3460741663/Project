// @
const path = require('path');
const webpackMerge = require('webpack-merge');
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
  externals: [nodeExternals()],
  module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                // 服务端渲染不能用 style-loader，因为 node 没有 document 对象，无法插入 style 标签
                // 服务端本来就不能渲染 dom，只是提供 html/css/js 代码给浏览器，交给浏览器去渲染
                // 服务端返回的 html 源码里，没有 style 标签
                // 而在浏览器中的 html 源码里，有 style 标签，是通过 js 插入进去的
                'isomorphic-style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }
            ]
        }
    ]
}
}
module.exports = webpackMerge(baseConfig, 
  serverConfig)