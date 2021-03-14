const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const fs = require("fs")
const port = process.env.PORT || 4001;
const index = require("./index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server); // < Interesting!





// Read ./Data/gpsData.json file for parse
let string_JsonData = fs.readFileSync('../Data/gpsData.json', 'utf8', (err, jsonString) => {
    if (err) { //Error check Önemli
        console.log("File read failed:", err)
        return
    }
})
// Json Parse
let object_JsonData = JSON.parse(string_JsonData)

//count for json array data
let counter = 0;
const getApiAndEmit = socket => {
    const response = object_JsonData.gpsData[counter]; //take
    socket.emit("FromAPI", response); //send
    counter++;
};

let interval;

//if client connect
io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }

    //send data every 1 second
    interval = setInterval(() => getApiAndEmit(socket), 1000);

    // if client disconnect
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });


});
//lisen port
server.listen(port, () => console.log(`Listening on port ${port}`));