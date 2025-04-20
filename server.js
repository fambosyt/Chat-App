const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Öffentliche Dateien (HTML, CSS, JS)

// Wenn ein Client verbunden wird
io.on('connection', (socket) => {
  console.log('Ein Benutzer ist verbunden');

  // Empfang von Nachrichten
  socket.on('chatMessage', (data) => {
    io.emit('chatMessage', data); // Sende die Nachricht an alle verbundenen Clients
  });

  // Wenn der Client trennt
  socket.on('disconnect', () => {
    console.log('Ein Benutzer hat die Verbindung beendet');
  });
});

// Server startet auf Port 3000
server.listen(3000, () => {
  console.log('Server läuft auf http://localhost:3000');
});
