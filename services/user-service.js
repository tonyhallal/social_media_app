/**********************************************************************
 File: user-services.js
 Author: Tony Hallal
 Date: 9/10/2023
 Description: this file contains all the services related to the users
 table.
 **********************************************************************/
import {query} from "../database/db.js";

//load all users
const findAll = async () => {
    try {
        const sql = "SELECT * from users"
        return await query(sql)
    } catch (err) {
        throw new Error(err);
    }
}

//load one user
const findById = async (id) => {
    try {
        const sql = 'select * from users where user_id =?'
        return await query(sql, [id])
    } catch (err) {
        throw new Error(err);
    }
}

//insert one user
const add = async (user) => {
    try {
        const sql = `insert into users 
                        (user_username, user_first_name, user_last_name,user_phone_number,user_email,user_address,user_profile_picture,user_bio,user_password)
                        values (?,?,?,?,?,?,?,?,?)`;

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
        } = user;

        return await query(sql, [user_username, user_first_name, user_last_name, user_phone_number, user_email, user_address, user_profile_picture, user_bio, user_password]);
    } catch (err) {
        throw new Error(err);
    }

}

//update user
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

//delete user
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