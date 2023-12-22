/**********************************************************************
 File: user-services.js
 Author: Tony Hallal
 Date: 4/11/2023
 Description: this file contains all the services related to the users
 table. Handles CRUD operations for users.
 **********************************************************************/
import {query} from "../database/db.js";

/**
 * finds the username and user id of the user that has the corresponding username
 * @param username
 * @return {Promise<*>}
 */
const findByUsername = async (username) => {
    try {
        const sql = 'select user_id, user_username from users where user_username = ?';
        const response = await query(sql, [username]);
        return response[0];
    } catch (err) {
        throw new Error(err);
    }
}
/**
 *
 * adds one user. Used for registration.
 * @returns {Promise<*|undefined>}
 * @param user_username
 * @param user_password
 */
const add = async (user_username, user_password) => {

    try {
        const sql = `insert into users 
                        (user_username, user_password)
                        values (?,?)`;


        return await query(sql, [user_username, user_password]);
    } catch (err) {
        throw new Error(err);
    }

}

export const UserService = {
    findByUsername,
    add,
}