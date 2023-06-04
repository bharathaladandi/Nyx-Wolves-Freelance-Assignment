const { WebSocketServer } = require("ws");


const wss = new WebSocketServer({ port: 8500 });

wss.on("connection", (socket) => {

    console.log("a new connection was made")

    socket.on("message", (msg) => {

        console.log("Client: " + msg);
    })
})

