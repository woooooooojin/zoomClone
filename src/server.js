import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express()

app.set("view engine","pug")
app.set("views",__dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (_,res)=>res.render("home"))
app.get("/*",(_,res)=>res.redirect("/"))

const handelListen = ()=>console.log(`Listening on http://localhost:3000`)
// app.listen(3000, handelListen)

const httpServer = http.createServer(app)
const wsServer = new Server(httpServer);

wsServer.on("connection", socket =>{
    socket.on('enter_room',(roomName,done)=>{

        socket.join(roomName)
        done()
        socket.to(roomName).emit("welcome")
       
    })
    socket.on('disconnecting',()=>{
        socket.rooms.forEach(room=>socket.to(room).emit('bye'))
    })

    socket.on('new_message',(msg,room,done)=>{
        socket.to(room).emit('new_message',msg)
        done()
        
    })
})

// const wss = new WebSocket.Server({httpServer})

// const sockets = [];

// wss.on('connection',(socket)=>{
//     sockets.push(socket)
//     socket['nickname'] = 'anonymous'
//     console.log('Connected to Browser')
//     socket.on("close",()=>console.log('Disconnected from the Browser'))
//     socket.on("message",(msg)=>{
//         const message = JSON.parse(msg)
//         switch(message.type){
//             case "new_message":
//                 sockets.forEach((aSocket)=>aSocket.send(`${socket.nickname} : ${message.payload}`))
//                 break ;
//             case "nickname":
//                 socket['nickname'] = message.payload
//                 break;

//         }
       
//     })
// })

httpServer.listen(3000, handelListen)
