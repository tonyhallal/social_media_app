/************************************************************************
 File: index.js
 Author: Tony Hallal
 Date: 11/10/2023
 Description: Entry point for the API
 ************************************************************************/
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import {config} from "dotenv";
import postRouter from "./routes/post.route.js";
import {createServer} from "http";
import {Server} from "socket.io";
import {addLike, removeLike, sendLikes} from "./controllers/like-controller.js";

config();
const app = express();
const server = createServer(app);
const socket = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});
//parse body to json
app.use(express.json())
//cors configuration
app.use(cors())
//define routes
app.use(process.env.APP_BASE_PREFIX, userRouter);
app.use(process.env.APP_BASE_PREFIX, postRouter);
//realtime connection
socket.on('connection', (socket) => {
    console.log('client connected')
    //send like count and likes
    socket.on('request_likes', async (postId) => {
      await sendLikes(socket, postId);
    })

    socket.on('add_like', async (like) => {
        await addLike(socket, like);
    });

    socket.on('remove_like', async (like) => {
        await removeLike(socket, like);
    })
})

const port = process.env.APP_PORT;
server.listen(port, () => {
    console.log(`listening on port ${port}`);
})