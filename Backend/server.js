import e from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import {YSocketIO} from "y-socket.io/dist/server";


const app = e();
app.use(e.static("public"));
const httpServer = createServer(app);



// Health Check Route
// app.get("/", (req, res) => {
//     res.status(200).json({
//         message: "Started",
//         success: true
//     })
// })

app.get("/health", (req, res) => {
    res.status(200).json({
        message: "ok",
        success: true
    })
})

const io = new Server(httpServer, {
    cors:{
        origin: "*",
        methods: ["GET", "POST"]
    }
})


const ySocketIO = new YSocketIO(io)
ySocketIO.initialize()

httpServer.listen(3000, () =>{
    console.log("Server is running on port 3000")
})