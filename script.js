const socket = io();

// Eingabefelder
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const chatBox = document.getElementById('chatBox');

// Warte auf den Usernamen
let username = '';

usernameInput.addEventListener('change', () => {
  username = usernameInput.value;
});

// Nachrichten senden
function sendMessage() {
  const message = messageInput.value.trim();
  if (message && username) {
    socket.emit('chatMessage', { username, message });
    messageInput.value = ''; // Eingabefeld leeren
  } else {
    alert("Bitte gib deinen Namen und eine Nachricht ein.");
  }
}

// Nachrichten empfangen
socket.on('chatMessage', data => {
  const messageElement = document.createElement('div');
  messageElement.textContent = `${data.username}: ${data.message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Scrollen nach unten
});
