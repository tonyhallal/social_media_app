/****************************************************************************************
 File: post-service.js
 Author: Tony Hallal
 Date: 4/11/2023
 Description: Contains all services related to posts. Handles CRUD operations for posts.
 **********************************************************************************+*****/
import {query} from "../database/db.js";

/**
 * get all users except the posts of one user. This user will be the logged-in user. This service is used
 * to display all posts on the home page except the ones for the logged-in user.
 * @param user_id
 * @returns {Promise<*|undefined>}
 */
const get = async (user_id) => {
    try {
        //fetch posts
        let sql = `SELECT * FROM post WHERE user_id != ?`;
        const posts = await query(sql, [user_id]);
        //fetch likes
        sql = 'select * from likes';
        const likes = await query(sql);

        //fetch comments
        sql = 'select * from comments'
        const comments = await query(sql);

        //return an array of objects, each object containing one post and its corresponding likes and comments.
        return posts.map(post => {
            const likesForOnePost = likes.filter(like => like.post_id === post.post_id);
            const commentsForOnePost = comments.filter(comment => comment.post_id === post.post_id);

            return {
                post,
                likes: likesForOnePost.length,
                comments: commentsForOnePost
            }
        });
    } catch (err) {
        throw new Error(err);
    }
}
/**
 * get posts for one user
 * @param userId
 * @returns {Promise<*|undefined>}
 */
const findById = async (userId) => {
    try {
        let sql = 'Select * from post where user_id = ?'
        const posts = await query(sql, [userId]);

        sql = 'select * from likes';
        const likes = await query(sql);

        sql = 'select * from comments';
        const comments = await query(sql);

        return posts.map(post => {
            const likesForOnePost = likes.filter(like => like.post_id === post.post_id);
            const commentsForOnePost = comments.filter(comment => comment.post_id === post.post_id);

            return {
                post,
                likes: likesForOnePost.length,
                comments: commentsForOnePost
            }
        })
    } catch (err) {
        throw new Error(err)
    }
}
/**
 * add a post
 * @param post_caption
 * @param post_attachment
 * @param user_id
 * @returns {Promise<*|undefined>}
 */
const add = async (post_caption, post_attachment, user_id) => {
    try {
        const sql = `insert into post (post_caption, post_attachment, user_id) 
                            Values (?,?,?)`
        return await query(sql, [post_caption, post_attachment, user_id]);
    } catch (err) {
        throw new Error(err);
    }
}
/**
 * update a post
 * @param postId
 * @param newPost
 * @returns {Promise<*|undefined>}
 */
const update = async (postId, newPost) => {
    try {
        const sql = `UPDATE post SET post_caption = ?, post_attachment = ? 
                            WHERE post_id = ?`;
        const {post_caption, post_attachment} = newPost;
        return await query(sql, [post_caption, post_attachment, postId]);
    } catch (err) {
        throw new Error(err)
    }
}
/**
 * delete a post
 * @param postId
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