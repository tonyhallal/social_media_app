/****************************************************************************************************
 File: user-controllers.js
 Author: Tony Hallal
 Date: 9/10/2023
 Description: Handles request validators for user-related operations and delegates to user services.
 ****************************************************************************************************/
import {UserService} from "../services/user-service.js";
import {validationResult} from "express-validator";

/**
 * finds all the users. Returns an array of users in case of success. Returns an error message in case of an error.
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export const findAllUsers = async (req, res) => {
    try {
        res.status(200).send(await UserService.findAll());
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
}


/**
 * finds one user by his id. returns a success message and a description of the database modification. Returns an error
 * message in case of an error
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export const findUserById = async (req, res) => {
    try {
        const {user_id} = req.params;
        const [user] = await UserService.findById(user_id);
        //check if user is found
        if (!user) {
            res.status(404).send(`user with id ${user_id} was not found`);
            return;
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
}


/**
 * adds a user
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export const addUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }

    try {
        const {
            user_username,
            user_first_name,
            user_last_name,
            user_phone_number,
            user_email,
            user_address,
            user_profile_picture,
            user_bio,
            user_password
        } = req.body;

        res.status(201).send({
            dbModification: await UserService.add(user_username,
                user_first_name,
                user_last_name,
                user_phone_number,
                user_email,
                user_address,
                user_profile_picture,
                user_bio,
                user_password),
            message: 'User added successfully'
        })
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);

    }
}

/**
 * updates a user' info
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }
    try {
        const {user_id, newUser} = req.body;
        const executeUserUpdate = await UserService.update(user_id, newUser);

        res.status(201).send({
            dbModification: executeUserUpdate,
            message: 'User updated successfully'
        });
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
}

/**
 * delete a user by id
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export const deleteUser = async (req, res) => {
    try {
        const {user_id} = req.params;
        res.status(200).send({
            dbModification: await UserService.remove(user_id),
            message: 'User deleted successfully'
        });
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`)
    }
}

