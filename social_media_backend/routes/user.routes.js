/*******************************************************************
 File: user.routes.js
 Author: Tony Hallal
 Date: 10/10/2023
 Description: Routes for user CRUD operations
 ******************************************************************/
import {
    addUser, addUserForm,
    deleteUser,
    findAllUsers,
    findUserById,
    updateUser,
    updateUserForm
} from "../controllers/user-controller.js";
import express from "express";
import {addUserValidator, updateUserValidator} from "../validators/users-validator.js";

const userRouter = express.Router();
userRouter.get('/users', findAllUsers);
userRouter.get('/user/:user_id', findUserById);
userRouter.post('/add-user', addUserValidator, addUser);
userRouter.post('/update-user', updateUserValidator, updateUser);
userRouter.get('/update-user-form/:user_id', updateUserForm)
userRouter.get('/delete-user/:user_id', deleteUser);
userRouter.get('/add-user-form', addUserForm)

export default userRouter;