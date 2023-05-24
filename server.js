const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: ['http://127.0.0.1:5500'] // Cho phép truy cập từ origin http://127.0.0.1:5500
  }
});

const messages = []

io.on("connection", (socket) => {
  socket.emit('server_send_current_messages', messages)

  socket.on('client_send_message', (data) => {
    messages.push(data)

    // Gửi message cho toàn bộ client
    io.emit('server_send_message', data)
  })
});

io.listen(3000);
