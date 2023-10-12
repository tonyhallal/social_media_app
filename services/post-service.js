/****************************************************************************************
 File: post-service.js
 Author: Tony Hallal
 Date: 11/10/2023
 Description: Contains all services related to posts
 **********************************************************************************+*****/
import {query} from "../database/db.js";

//get posts for the user
const findById = async (userId) => {
    try {
        const sql = 'Select * from post where user_id = ?'
        return await query(sql, [userId]);
    } catch (err) {
        throw new Error(err)
    }
}


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

//update post
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

//delete post
const remove = async (postId) => {
    try {
        const sql = 'DELETE FROM post where post_id = ?';
        return await query(sql, [postId]);
    } catch (err) {
        throw new Error(err);
    }
}

export const PostService = {
    findById,
    add,
    update,
    remove
}