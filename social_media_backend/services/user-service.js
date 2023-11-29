/**********************************************************************
 File: user-services.js
 Author: Tony Hallal
 Date: 4/11/2023
 Description: this file contains all the services related to the users
 table. Handles CRUD operations for users.
 **********************************************************************/
import {query} from "../database/db.js";

/**
 * returns all the users
 * @returns {Promise<*|undefined>}
 */
const findAll = async () => {
    try {
        const sql = "SELECT * from users"
        return await query(sql)
    } catch (err) {
        throw new Error(err);
    }
}
/**
 * returns one user.
 * @param id
 * @returns {Promise<*|undefined>}
 */
const findById = async (id) => {
    try {
        const sql = 'select * from users where user_id =?'
        return await query(sql, [id])
    } catch (err) {
        throw new Error(err);
    }
}
/**
 *
 * adds one user. Used for registration.
 * @returns {Promise<*|undefined>}
 * @param user_username
 * @param user_first_name
 * @param user_last_name
 * @param user_phone_number
 * @param user_email
 * @param user_address
 * @param user_profile_picture
 * @param user_bio
 * @param user_password
 */
const add = async (user_username, user_first_name, user_last_name, user_phone_number, user_email, user_address, user_profile_picture, user_bio, user_password) => {

    try {
        const sql = `insert into users 
                        (user_username, user_first_name, user_last_name,user_phone_number,user_email,user_address,user_profile_picture,user_bio,user_password)
                        values (?,?,?,?,?,?,?,?,?)`;


        return await query(sql, [user_username, user_first_name, user_last_name, user_phone_number, user_email, user_address, user_profile_picture, user_bio, user_password]);
    } catch (err) {
        throw new Error(err);
    }

}
/**
 * updates a user.
 * @param id - id of the user to be updated
 * @param newUser - the updated info of that user
 * @returns {Promise<*|undefined>}
 */
const update = async (id, newUser) => {
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
    } = newUser;
    try {
        const sql = `update users set user_username = ?,
                        user_first_name = ?,
                        user_last_name = ?,
                        user_phone_number = ?,
                        user_email = ?,
                        user_address = ?,
                        user_profile_picture = ?,
                        user_bio = ?,
                        user_password = ?
                        where user_id = ?`
        return await query(sql, [user_username, user_first_name, user_last_name, user_phone_number, user_email, user_address, user_profile_picture, user_bio, user_password, id]);
    } catch (err) {
        throw new Error(err);
    }
}
/**
 * deletes a user
 * @param id - id of the user to be deleted.
 * @returns {Promise<*|undefined>}
 */
const remove = async (id) => {
    try {
        const sql = 'DELETE FROM users WHERE user_id = ?'
        return await query(sql, [id]);
    } catch (err) {

        throw new Error(err);
    }
}

export const UserService = {
    findAll,
    findById,
    add,
    update,
    remove
}