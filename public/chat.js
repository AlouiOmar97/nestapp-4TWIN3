const socket = io('http://localhost:3000');
socket.on('receive_message', (msg) => {
const messagesDiv = document.getElementById('messages');
const div = document.createElement('div');
div.innerText = `${msg.content} (${msg.date})`;
messagesDiv.appendChild(div);
});
document.getElementById('send').addEventListener('click', () => {
const content = document.getElementById('content').value;
socket.emit('send_message', { content });
document.getElementById('content').value = '';
});