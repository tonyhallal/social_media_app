/***********************************************************************************************************************
 File: message.routes.js
 Author: Tony Hallal
 Date: 14/11/2023
 Description: Routes for message read and operations.
 ***********************************************************************************************************************/
import express from "express";
import {deleteMessage, loadMessages} from "../controllers/message-controller.js";

const messageRouter = express.Router();

messageRouter.post('/messages', loadMessages); //handled using POST instead of GET because a body is needed.
messageRouter.delete('/message', deleteMessage);

export default messageRouter;
