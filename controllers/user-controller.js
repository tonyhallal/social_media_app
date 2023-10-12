/****************************************************************************************************
 File: user-controllers.js
 Author: Tony Hallal
 Date: 9/10/2023
 Description: Handles request validation for user-related operations and delegates to user services.
 ****************************************************************************************************/
import {UserService} from "../services/user-service.js";

//get all users
export const findAllUsers = async (req, res) => {
    try {
         res.status(200).send(await UserService.findAll());
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
}


//get one user
export const findUserById = async (req, res) => {
    try {
        const id = req.params.id;
        res.status(200).send(await UserService.findById(id));
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
}


//add a user
export const addUser = async (req, res) => {
    try {
        const {user} = req.body;
        res.status(201).send(await UserService.add(user))
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);

    }
}

//update user
export const updateUser = async (req, res) => {
    try {
        const {newUser} = req.body;
        const id = req.params.id;
        res.status(201).send(await UserService.update(id, newUser));
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
}

//delete user
export const deleteUser = async (req, res) => {
    try {
        const user_id = req.params.id;
        res.status(200).send(await UserService.remove(user_id));
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`)
    }
}

