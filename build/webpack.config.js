var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    /**
     * 入口
     */
    entry: {
        index: path.resolve(__dirname, '../app/index/index.js')
    },
    /**
     * 输出
     */
    output: {
        path: path.resolve(__dirname, '../output/static'), //输出目录
        publicPath: 'static/', // html中嵌入的script的src的路径
        filename: 'js/[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js' //非入口文件的命名规则
    },
    resolve: {
        extensions: ['', '.js', '.vue'] //import省略的扩展名
    },
    module: {
        loaders: [
            // vue-loader加载.vue结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            // 使用babel 加载 .js结尾的文件转化为es2015支持的格式
            {
                test: /\.js$/,
                loader: 'babel?presets=es2015',
                exclude: /node_modules/
            },
            // 加载图片
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'images/[name].[ext]?[hash:7]'
                }
            }
        ]
    },
    plugins: [
        /**
         * 输出目录生成Html,并引入输出的入口文件
         */
        new HtmlWebpackPlugin({
            filename: '../index.html', //路径 === output.path,生成index.html
            template: path.resolve(__dirname, '../app/index/index.html'), //模板的路径
            inject: true //true: js资源被注入到body元素的底部  head:js资源被注入到head元素的底部
        })
    ]
};