/*******************************************************************
 File: user.routes.js
 Author: Tony Hallal
 Date: 10/10/2023
 Description: Routes for user CRUD operations
******************************************************************/
import {addUser, deleteUser, findAllUsers, findUserById, updateUser} from "../controllers/user-controller.js";
import express from "express";
import {addUserValidator, updateUserValidator} from "../validators/users-validator.js";

const userRouter = express.Router();
userRouter.get('/users', findAllUsers);
userRouter.get('/user/:user_id', findUserById);
userRouter.post('/user',addUserValidator, addUser);
userRouter.put('/user', updateUserValidator, updateUser);
userRouter.delete('/user/:user_id', deleteUser);

export default userRouter;