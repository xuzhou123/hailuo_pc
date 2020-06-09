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
    }
}