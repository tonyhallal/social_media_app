/***********************************************************************************************************************
 * File: auth-service.js
 * Author: Tony Hallal
 * Date: 18/11/2023
 * Description: Handles validators regarding user authentication and delegates to the auth-service.
 ***********************************************************************************************************************/
import {isUserAuthenticated} from "../services/auth-service.js";
import {validationResult} from "express-validator";

/**
 * checks if the user is authenticated. Returns an http response accordingly.
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export const authenticateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }

    try {
        const {user_username, user_password} = req.body;
        if (await isUserAuthenticated(user_username, user_password)) {
            res.sendStatus(200)
            return;
        }
        res.sendStatus(401);
    } catch (err) {
        res.status(500).send(err.message);
    }
}