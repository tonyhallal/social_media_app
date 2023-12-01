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
import commentsRouter from "./routes/comments.routes.js";
import messageRouter from "./routes/message.routes.js";
import {Server} from "socket.io";
import {messageSocketHandler} from "./sockets/messageSocketHandler.js";
import authRouter from "./routes/auth.routes.js";

config();
const app = express();
const server = createServer(app);

//parse body to json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cors configuration
app.use(cors());

//set view engine
app.set('view engine', 'ejs');
app.set('views', './views')

//define routes
app.use(process.env.APP_BASE_PREFIX, userRouter, postRouter, likesRouter, commentsRouter, messageRouter, authRouter);
//realtime handling
const io = new Server(server);
io.on('connection', (socket) => {
    messageSocketHandler(socket);
})

const port = process.env.APP_PORT;
server.listen(port, () => {
    console.log(`listening on port ${port}`);
})