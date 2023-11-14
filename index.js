/************************************************************************
 File: index.js
 Author: Tony Hallal
 Date: 11/10/2023
 Description: Entry point for the API
 ************************************************************************/
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import {config} from "dotenv";
import postRouter from "./routes/post.routes.js";
import {createServer} from "http";
import likesRouter from "./routes/likes.routes.js";
import {useRoutes} from "./helpers/helper.js";
import commentsRouter from "./routes/comments.routes.js";
import messageRouter from "./routes/message.routes.js";
import {Server} from "socket.io";
import {messageSocketHandler} from "./sockets/messageSocketHandler.js";

config();
const app = express();
const server = createServer(app);
//parse body to json
app.use(express.json())
//cors configuration
app.use(cors())
//define routes
useRoutes(app, userRouter, postRouter, likesRouter, commentsRouter, messageRouter);

//realtime handling
const io = new Server(server);
io.on('connection', (socket) => {
    messageSocketHandler(socket);
})

const port = process.env.APP_PORT;
server.listen(port, () => {
    console.log(`listening on port ${port}`);
})