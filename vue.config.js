module.exports = {
    // 基本路径
    publicPath: './',
    // 构建时输出目录
    outputDir: 'dist',
    // 放置静态文件的目录
    assetsDir: 'static',
    // html 输出路径
    indexPath: 'index.html',
    // 文件名是否哈希
    filenameHashing: false,
    // 配置服务
    devServer: {
        host: 'localhost', // 可以被process.env.HOST替换
        port: 8000, // 可以被process.env.PORT替换，如果已被占用会另起一个空闲端口
        https: false,
        // 配置代理
        proxy: {
            '/api': {
                target: 'http://live.hailuolive.com/', //目标接口域名
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/api': '/' //重写接口
                }
            }
        }
    },
    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'element-ui': 'ELEMENT'
        }
    },
    // 构建多页面应用，页面的配置
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '海螺视频',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
            // 设置ico
            favicon: './public/favicon1.ico',
        }
    },
}