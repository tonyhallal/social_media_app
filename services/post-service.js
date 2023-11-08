/****************************************************************************************
 File: post-service.js
 Author: Tony Hallal
 Date: 4/11/2023
 Description: Contains all services related to posts. Handles CRUD operations for posts.
 **********************************************************************************+*****/
import {query} from "../database/db.js";

/**
 *
 * @param user_id
 * get all users except the posts of one user. This user will be the logged-in user. This service is used
 * to display all posts on the home page except the ones for the logged-in user.
 * @returns {Promise<*|undefined>}
 */
const get = async (user_id) => {
    try {
        const sql = `SELECT * FROM posts WHERE user_id != ?`;
        return await query(sql,[user_id])
    }catch(err) {
        throw new Error(err);
    }
}
/**
 *
 * @param userId
 * get posts for one user
 * @returns {Promise<*|undefined>}
 */
const findById = async (userId) => {
    try {
        const sql = 'Select * from post where user_id = ?'
        return await query(sql, [userId]);
    } catch (err) {
        throw new Error(err)
    }
}
/**
 *
 * @param post
 * add a post
 * @returns {Promise<*|undefined>}
 */
const add = async (post) => {
    try {
        const sql = `insert into post (post_caption, post_attachment, user_id) 
                            Values (?,?,?)`
        const {post_caption, post_attachment, user_id} = post;
        return await query(sql, [post_caption, post_attachment, user_id]);
    } catch (err) {
        throw new Error(err);
    }
}
/**
 *
 * @param postId
 * @param newPost
 * update a post
 * @returns {Promise<*|undefined>}
 */
const update = async (postId, newPost) => {
    try {
        const sql = `UPDATE post SET post_caption = ?, post_attachment = ? 
                            WHERE post_id = ?`;
        const {post_caption, post_attachment} = newPost;
        return await query(sql, [post_caption, post_attachment]);
    } catch (err) {
        throw new Error(err)
    }
}
/**
 *
 * @param postId
 * delete a post
 * @returns {Promise<*|undefined>}
 */
const remove = async (postId) => {
    try {
        const sql = 'DELETE FROM post where post_id = ?';
        return await query(sql, [postId]);
    } catch (err) {
        throw new Error(err);
    }
}

export const PostService = {
    get,
    findById,
    add,
    update,
    remove
}