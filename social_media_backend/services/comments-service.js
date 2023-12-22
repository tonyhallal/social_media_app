/**************************************************************************************************************
 File: comments-service.js
 Author: Tony Hallal
 Date: 12/11/2023
 Description: contains all the services related to comments. handles retrieving, adding and deleting comments.
 **************************************************************************************************************/
import {query} from "../database/db.js";

/**
 * gets all the comments for one post.
 * @param post_id
 * @returns {Promise<*|undefined>}
 */
const getForOnePost = async (post_id) => {
    try {
        const sql = `select user_username, comment_content from comments 
                            join users on comments.user_id = users.user_id
                            where post_id = ?`;
        return await query(sql, [post_id]);
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * adds a comment to the database.
 * @returns {Promise<*|undefined>}
 * @param user_id
 * @param post_id
 * @param comment_content
 */
const add = async (user_id, post_id, comment_content) => {
    try {
        const sql = `INSERT INTO comments (user_id, post_id, comment_content)
                            VALUES (?, ?, ?)`
        return await query(sql, [user_id, post_id, comment_content]);
    } catch (err) {
        throw new Error(err);
    }
}

export const CommentsService = {
    getForOnePost,
    add,

}