//只能写原生js 语法

const proxy = require('http-proxy-middleware')

//暴露一个 配置对象
module.exports = function(app) // app: 服务对象
{
    app.use(
        // proxy 接收2个参数，1. 哪些前缀请求，触发该代理配置, 发送到 配置对象,  2. 配置对象
        proxy('/api1', { 
            target: 'http://localhost:5000',
            changeOrigin: true, // 控制服务器收到的请求头中的host 的值(host 标识本次请求 从哪发出的)。 默认值 ： false
            pathRewrite:{'^/api1':''} // 重写请求路径: 前缀替换成空串(正则匹配)[必须]
        }),
        
        proxy('/api2', { 
            target: 'http://localhost:5001',
            changeOrigin: true,
            pathRewrite:{'^/api2':''} 
        }),


    )
}