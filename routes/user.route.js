/*******************************************************************
 File: user.route.js
 Author: Tony Hallal
 Date: 10/10/2023
 Description: Routes for user CRUD operations
 ******************************************************************/
import {addUser, deleteUser, findAllUsers, findUserById, updateUser} from "../controllers/user-controller.js";
import express from "express";


const userRouter = express.Router();
userRouter.get('/users', findAllUsers);
userRouter.get('/user/:id', findUserById)
userRouter.post('/user', addUser);
userRouter.put('/user/:id', updateUser)
userRouter.delete('/user/:id', deleteUser);

export default userRouter;