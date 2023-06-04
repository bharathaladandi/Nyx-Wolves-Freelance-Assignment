const express = require('express');
const { Server } = require("socket.io");
const http = require('http');
const cors = require('cors');
const { UserRouter } = require("./Routes/user.routes");
const Usermodel = require('./models/userModel');
const {connect}  = require('./config/db');

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app)
app.use("/users", UserRouter);


const PORT = 8000;

server.listen(PORT,{log:false, origins:'*:*'}, async () => {

    
    try {
        await connect
        console.log("Connected to DB Successfully")

    } catch (err) {
        console.log("error while connecting to db", err);
    }
    console.log(`Listening on port 8000`);
})

const io = new Server(server);


// io.on("connection", (socket) => {

//     socket.emit("abc", "Hello")

//     socket.on("mno", (msg) => {

//         console.log(msg);
//     })
// })


server.prependListener("request", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
 });


io.on('connection', socket => {
    console.log('Socket connected');

    // Emit all records to connected clients
    const emitAllRecords = async () => {
        try {
            const records = await Usermodel.find();
            socket.emit('records', records);
        } catch (err) {
            console.error(err.message);
        }
    };

    // Emit all records when a new record is added
    socket.on('addRecord', async newRecord => {
        try {
            const record = new Usermodel(newRecord);
            await record.save();
            emitAllRecords();
        } catch (err) {
            console.error(err.message);
        }
    });

    // Emit all records when a record is updated
    socket.on('updateRecord', async updatedRecord => {
        try {
            await Usermodel.findByIdAndUpdate(updatedRecord._id, updatedRecord);
            emitAllRecords();
        } catch (err) {
            console.error(err.message);
        }
    });

    // Emit all records when a record is deleted
    socket.on('deleteRecord', async recordId => {
        try {
            await Usermodel.findByIdAndDelete(recordId);
            emitAllRecords();
        } catch (err) {
            console.error(err.message);
        }
    });

    socket.on('disconnect', async () => {

        console.log('Socket disconnected');
    });
});












// app.get("/", (req, res) => {

//     res.send("base end point")
// });




// app.listen(8000, () =>{
//     console.log(`Listening on port 8000`);
// })
