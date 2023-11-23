import express from "express";
import http from "http";
import WebSocket from "ws"

const app = express()

app.set("view engine","pug")
app.set("views",__dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (_,res)=>res.render("home"))
app.get("/*",(_,res)=>res.redirect("/"))

const handelListen = ()=>console.log(`Listening on http://localhost:3000`)
// app.listen(3000, handelListen)

const server = http.createServer(app)

const wss = new WebSocket.Server({server})

function handelConnection(socket){
    console.log(socket)
}

wss.on('connection',handelConnection)

server.listen(3000, handelListen)
