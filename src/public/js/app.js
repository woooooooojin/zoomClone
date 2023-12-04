const socket = io();

const welcome = document.getElementById('welcome')
const form = welcome.querySelector('form')
const room = document.getElementById('room')

room.hidden = true

let roomName

function nicknameSubmit(e){
    e.preventDefault()
    const input = room.querySelector('#name input')
    const value = input.value
    socket.emit('nickname', input.value)
}

function handelMessageSubmit(e){
    e.preventDefault()
    const input = room.querySelector('#msg input')
    socket.emit('new_message',input.value,roomName,()=>{
        addMessage(`YOU : ${input.value}`)
        input.value=''
    })
    
}

function addMessage(message){
    const ul = room.querySelector('ul')
    const li = document.createElement('li')
    li.innerText = message
    ul.appendChild(li)
}

function showRoom(){
    welcome.hidden = true
    room.hidden = false
    const h3 = room.querySelector('h3')
    h3.innerText = `Room ${roomName}`
    const msgForm = room.querySelector('#msg')
    const nameForm = room.querySelector('#name')
    msgForm.addEventListener('submit',handelMessageSubmit)
    nameForm.addEventListener('submit',nicknameSubmit)
}

function handleRoomsubmit(e){
    const roomNameInput = form.querySelector('#roomname')
    const nickNameInput = form.querySelector('#name')
    e.preventDefault();
    // const input = form.querySelector('input')
    socket.emit('enter_room',roomNameInput.value, nickNameInput.value, showRoom)
    roomName = roomNameInput.value
    roomNameInput.value=''
    const changeNameInput = room.querySelector('#name input')
    changeNameInput.value = nickNameInput.value

}

form.addEventListener('submit',handleRoomsubmit)

socket.on('welcome',(user)=>{
    addMessage(`${user} joined`)
})

socket.on('bye',(left)=>{
    addMessage(`${left} left`)
})

socket.on('new_message',addMessage)