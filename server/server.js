// Constantes
const path = require('path');
const express = require('express');
const app = express();
const http = require("http");
const socketIO = require("socket.io");
let server = http.createServer(app);

// Configuracion
const publicPath = path.resolve(__dirname, "..//public");
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

// Exportar el SocketIO
module.exports.io = socketIO(server);
require("./socket/socket");

// Verificar Puerto
server.listen(port, (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log("Servidor corriendo en el pueto: " + port);
});