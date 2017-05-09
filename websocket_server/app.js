var http = require("http");
var socketio = require("socket.io");

var server = http.createServer(function(req, res) {
     res.writeHead(200, {"Content-Type":"text/plane"});
     res.end("connected");
}).listen(4000);

var io = socketio.listen(server);

io.sockets.on("connection", function (socket) {

  socket.on("text", function (data) {
    console.log("[" + data.name + "]" + data.text);
    // ブロードキャスト（送信者以外の全員に送信）
    socket.broadcast.emit("text", data);
    // 自分にも送信
    socket.emit("text",data);
  });

});
