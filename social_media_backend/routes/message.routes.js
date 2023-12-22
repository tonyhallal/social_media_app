/***********************************************************************************************************************
 File: message.routes.js
 Author: Tony Hallal
 Date: 14/11/2023
 Description: Routes for message read and operations.
 ***********************************************************************************************************************/
import express from "express";
import {connectedUsersForMessaging, loadMessages} from "../controllers/message-controller.js";

const messageRouter = express.Router();

messageRouter.get('/messages/:loggedUser/:user', loadMessages); //handled using POST instead of GET because a body is needed.
messageRouter.get('/connected-users', connectedUsersForMessaging);
export default messageRouter;
