const userForm = document.getElementById('user-form');

const socket = io();

userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = e.target.elements.username.value;

    socket.emit('enterUser', username);

    socket.on('insertUserFailed', (message) => {
        alert(message);
    })

    socket.on('insertUserSuccessfully', () => {
        window.location = 'chat.html';
    })
});
