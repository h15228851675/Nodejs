//  结合 fs 发送文件中的数据
//  引入 http 和 fs 模块
var http = require('http');
var fs = require('fs');
// 创建服务器
var server = http.createServer();
// 监听 request 请求事件，设置请求处理函数
server.on('request', function(req, res) {
    // 处理 url
    var url = req.url;
    if(url === '/') {
        // 下面注释代码的写法显然是不合理的
        // res.end('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title></head><body><h1>首页</h1></body>/html>')
        res.setHeader('Content-Type', 'text/plain');
        // 我们要发送的还是在文件中的内容
        fs.readFile('./index.html', function(err, data) {
            if(err) {
                res.end('文件读取失败，请稍后重试！');
            } else {
                // data 默认是二进制数据，可以通过 .toString 转为咱们能识别的字符串
                // res.end() 支持两种数据类型，一种是二进制，一种是字符串
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(data);
            }
        })
    } else if(url === '/register') {
        // url：统一资源定位符
        // 一个 url 最终其实是要对应到一个资源的
        fs.readFile('./register.html', function(err, data) {
            if(err) {

                res.end('文件读取失败，请稍后重试！');
            } else {
                //setHeader也是设置响应头，它们将与传递给 response.writeHead() 的任何响应头合并，其中 response.writeHead() 的响应头优先。

                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        })
    } else {
        res.end('<h1>404 Not Found.</h1>');
    }
});

server.listen(8080, function() {
    console.log('Server is running...');
});