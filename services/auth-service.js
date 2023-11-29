/***********************************************************************************************************************
 * File: auth-service.js
 * Author: Tony Hallal
 * Date: 18/11/2023
 * Description: Handles user authentication.
 ***********************************************************************************************************************/
import {query} from "../database/db.js";

/**
 * Checks if the username and password are correct.
 *
 * @param {*} username
 * @param {*} password
 * @return {Promise<boolean>}
 */
export const isUserAuthenticated = async (username, password) => {
    try {
        const sql = `SELECT * FROM users 
                            WHERE user_username = ?`;
        const response = await query(sql, [username]);
        const {user_username, user_password} = response[0];
        return user_username === username && user_password === password;
    } catch (err) {
        throw new Error(err);
    }
}

