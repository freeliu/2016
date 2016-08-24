
//1.node.js 需要自己实现http服务器
var http=require("http");
//2.http.createServer() 方法创建服务器
http.createServer(function(request,response){
    response.writeHead(200,"",{"Content-Type":"text/plain"})
    response.end("hellow world");
}).listen(1234);