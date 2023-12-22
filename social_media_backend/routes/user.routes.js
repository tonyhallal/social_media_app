/*******************************************************************
 File: user.routes.js
 Author: Tony Hallal
 Date: 10/10/2023
 Description: Routes for user CRUD operations
 ******************************************************************/
import {addUser} from "../controllers/user-controller.js";
import express from "express";
import {addUserValidator} from "../validators/users-validator.js";

const userRouter = express.Router();
userRouter.post('/add-user', addUserValidator, addUser);

export default userRouter;