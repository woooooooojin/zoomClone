const socket = io();

const welcome = document.getElementById('welcome')
const form = welcome.querySelector('form')
const room = document.getElementById('room')

room.hidden = true

let roomName

function handelMessageSubmit(e){
    e.preventDefault()
    const input = room.querySelector('input')
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
    const form = room.querySelector('form')
    form.addEventListener('submit',handelMessageSubmit)
}

function handleRoomsubmit(e){
    e.preventDefault();
    const input = form.querySelector('input')
    socket.emit('enter_room',input.value, showRoom)
    roomName = input.value
    input.value=''

}

form.addEventListener('submit',handleRoomsubmit)

socket.on('welcome',()=>{
    addMessage('someone joined !')
})

socket.on('bye',()=>{
    addMessage('someone left !')
})

socket.on('new_message',addMessage)