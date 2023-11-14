/**************************************************************************************************************
 File: comments-service.js
 Author: Tony Hallal
 Date: 12/11/2023
 Description: contains all the services related to comments. handles retrieving, adding and deleting comments.
 **************************************************************************************************************/
import {query} from "../database/db.js";

/**
 * gets all the comments for all the posts
 * @returns {Promise<*|undefined>}
 */
const get = async () => {
    try {
        const sql = `select * from comments group by post_id`;
        return await query(sql);
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * @param post_id
 * gets all the comments for one post.
 * @returns {Promise<*|undefined>}
 */
const getForOnePost = async (post_id) => {
    try {
        const sql = `select * from comments 
                            where post_id = ?`;
        return await query(sql, [post_id]);
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * @param comment
 * adds a comment to the database.
 * @returns {Promise<*|undefined>}
 */
const add = async (comment) => {
    try {
        //destructure comment object
        const {user_id, post_id, comment_content} = comment;
        const sql = `INSERT INTO comments (user_id, post_id, comment_content)
                            VALUES (?, ?, ?)`
        return await query(sql, [user_id, post_id, comment_content]);
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * @param comment_id
 * deletes a comment from the database.
 * @returns {Promise<*|undefined>}
 */
const remove = async (comment_id) => {
    try {
        const sql = `DELETE FROM comments
                            WHERE comment_id = ?`;
        return await query(sql, [comment_id]);
    } catch (err) {
        throw new Error(err);
    }
}

export const CommentsService = {
    get,
    getForOnePost,
    add,
    remove
}