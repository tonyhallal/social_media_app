/****************************************************************************************
 File: post-service.js
 Author: Tony Hallal
 Date: 4/11/2023
 Description: Contains all services related to posts. Handles CRUD operations for posts.
 **********************************************************************************+*****/
import {query} from "../database/db.js";
import {fileTypeFromBuffer} from "file-type";

/**
 * get all users except the posts of one user. This user will be the logged-in user. This service is used
 * to display all posts on the home page except the ones for the logged-in user.
 * @returns {Promise<*|undefined>}
 */
const get = async () => {
    try {
        //fetch posts
        let sql = `SELECT user_username, post_id, post_caption FROM post
                          INNER JOIN users ON post.user_id = users.user_id`;
        const posts = await query(sql);

        //fetch likes (did not use likes service so that each entity stays as separated as possible from the other)
        sql = 'select * from likes';
        const likes = await query(sql);

        //return an array of objects, each object containing one post and its corresponding likes and comments.
        return posts.map(post => {
            const likesForOnePost = likes.filter(like => like.post_id === post.post_id);
            return {
                post,
                likes: likesForOnePost,
            }

        });

    } catch (err) {
        throw new Error(err);
    }
}

/**
 * finds the image that corresponds to a post. Used to serve blob image directly to ejs template
 * @param post_id
 * @return {Promise<string>}
 */
const findImage = async (post_id) => {
    try {
        const sql = `select post_attachment, post_mime_type from post where post_id = ?`;
        const resp = await query(sql, [post_id]);
        return resp[0].post_attachment; //return the image
    } catch (err) {
        throw new Error(err.message);
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
    //get the mime type of the image
    const mime = (await fileTypeFromBuffer(post_attachment)).mime;
    try {
        const sql = `insert into post (post_caption, post_attachment,post_mime_type, user_id) 
                            Values (?,?,?,?)`
        return await query(sql, [post_caption, post_attachment, mime, user_id]);
    } catch (err) {
        throw new Error(err);
    }
}


export const PostService = {
    get,
    add,
    findImage
}