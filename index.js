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
import likesRouter from "./routes/likes.routes.js";

config();
const app = express();
const server = createServer(app);
//parse body to json
app.use(express.json())
//cors configuration
app.use(cors())
//define routes
app.use(process.env.APP_BASE_PREFIX, userRouter);
app.use(process.env.APP_BASE_PREFIX, postRouter);
app.use(process.env.APP_BASE_PREFIX, likesRouter);

const port = process.env.APP_PORT;
server.listen(port, () => {
    console.log(`listening on port ${port}`);
})