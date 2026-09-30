import express from "express"
import { createServer } from "node:http"
import { Server } from "socket.io"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.static("public"));

io.on("connection", (socket)=>{
    //socket.broadcast.emit envia para todos menos pro usuario atual
    socket.broadcast.emit("connection", `Participante: ${socket.id} entrou na sala`);
    socket.on("sendMessage", (message)=>{
        io.emit("sendMessage", message)
    })

    socket.on("disconnect", (socket) => {
        io.emit("desconnect", `Participante: ${socket.id} saiu da sala`);
    });
})

httpServer.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});