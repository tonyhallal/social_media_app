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
import {LikeService} from "./services/likes-service.js";

config();

const app = express();
const server = createServer(app);
const socket = new Server(server);
//parse body to json
app.use(express.json())
//cors configuration
app.use(cors())
//define routes
app.use(process.env.APP_BASE_PREFIX, userRouter);
app.use(process.env.APP_BASE_PREFIX, postRouter);

socket.on('connection', (socket) => {
    socket.on('request_likes', (postId) => {
        socket.emit('send_likes', LikeService.get(postId))
    })

    socket.on('add_like', async (like) => {
        await LikeService.add(like);
        const {post_id} = like;
        socket.emit('send_likes', LikeService.get(post_id))
    })

    socket.on('remove_like', async (like) => {
        const {like_id, post_id} = like;
        await LikeService.remove(like_id)
        socket.emit('send_likes', LikeService.get(post_id));
    })
})

const port = process.env.APP_PORT;
server.listen(port, () => {
    console.log(`listening on port ${port}`);
})