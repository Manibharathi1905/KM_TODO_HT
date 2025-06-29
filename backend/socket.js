const { Server } = require("socket.io");

function setupSocket(server) {
  const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL, credentials: true },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  });

  return io;
}

module.exports = setupSocket;
