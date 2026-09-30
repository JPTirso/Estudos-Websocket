const socket = io();

const messageInput = document.querySelector("#message");
const messageForm = document.querySelector("#messageForm");
const messages = document.querySelector("#messages");
const status = document.querySelector("#status");

socket.on("connect", () => {

    console.log("Conectado ao servidor!");
    console.log("Meu socket.id:", socket.id);

    status.textContent = `Conectado • ${socket.id}`;
});


socket.on("connection", (message) => {

    addMessage(message);

});

socket.on("sendMessage", (message) => {

    addMessage(message);

});

socket.on("disconnect", () => {

    status.textContent = "Desconectado";

    addMessage("Um participante saiu da sala.");

});

messageForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const message = messageInput.value.trim();

    if (!message) return;

    socket.emit("sendMessage", message);

    messageInput.value = "";
    messageInput.focus();

});

function addMessage(message) {

    const element = document.createElement("p");

    element.textContent = message;

    messages.appendChild(element);

    messages.scrollTop = messages.scrollHeight;

}
