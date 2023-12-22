/****************************************************************************************************
 File: user-controllers.js
 Author: Tony Hallal
 Date: 9/10/2023
 Description: Handles request validators for user-related operations and delegates to user services.
 ****************************************************************************************************/
import {UserService} from "../services/user-service.js";
import {validationResult} from "express-validator";

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
        const {user_username, user_password} = req.body;
        await UserService.add(user_username, user_password)

        res.redirect('/');
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
}


