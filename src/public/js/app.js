const socket = io();

const welcome = document.getElementById('welcome')
const form = welcome.querySelector('form')

function handleRoomsubmit(e){
    e.preventDefault();
    const input = form.querySelector('input')
    socket.emit('enter_room',)
    input.value=''

}

form.addEventListener('submit',handleRoomsubmit)