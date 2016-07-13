var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.config');

var app = express();
var compiler = webpack(config);

/**
 * 中间件:修改代码的时候不需要构建
 */
var devMiddleware = require('webpack-dev-middleware')(compiler,{
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});

/**
 * 中间件: 热加载
 */
var hotMiddleware = require('webpack-hot-middleware')(compiler);

/**
 * webpack插件: 监听html文件改变事件
 */
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

app.use(devMiddleware);
app.use(hotMiddleware);

app.listen(8888, function (err) {
    if(err) {
        console.log(err);
        return;
    } 
    console.log('Listening at http://localhost:8888');
});