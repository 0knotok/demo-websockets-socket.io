// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir archivos estáticos
app.use(express.static('public'));

// Evento de conexión
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Escuchar mensajes del cliente
  socket.on('chat message', (msg) => {
    console.log('Mensaje recibido:', msg);
    // Emitir el mensaje a todos los clientes conectados
    io.emit('chat message', msg);
  });

  // Manejar desconexión
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

// Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
