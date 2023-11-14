/****************************************************************************************
 File: post-service.js
 Author: Tony Hallal
 Date: 4/11/2023
 Description: Contains all services related to likes. Handles sending likes count and
 likes, adding likes and removing likes.
 **********************************************************************************+*****/
import {query} from "../database/db.js";

/**
 * get all the likes for all posts
 * @returns {Promise<*|undefined>}
 */
const get = async () => {
    try{
        const sql = `SELECT * FROM likes group by post_id`
        return await query(sql);
    }catch(err) {
        throw new Error(err)
    }
}

/**
 *
 * @param postId
 * returns like count
 * @returns {Promise<*>}
 */
const getForOnePost = async (postId) => {
    try {
        const sql = `select count(*) as like_count from likes where post_id = ?`
        const [likeCountQuery] = await query(sql, [postId]);
        //return like count property
        const {like_count} = likeCountQuery;
        return like_count;
    } catch (err) {
        throw new Error(err);
    }
}
/**
 *
 * @param like
 * adds a like
 * @returns {Promise<*>}
 */
const add = async (like) => {

    try {
        const sql = `INSERT INTO likes (user_id, post_id)
                        values (?,?)`
        const {user_id, post_id} = like;
        return await query(sql, [user_id, post_id]);
    } catch (err) {
        throw new Error(err);
    }
}
/**
 *
 * @param likeId
 * deletes a like
 * @returns {Promise<*|undefined>}
 */
const remove = async (likeId) => {
    try {
        const sql = `delete from like where like_id = ?`;
        return await query(sql, [likeId]);
    } catch (err) {
        throw new Error(err);
    }
}

export const LikeService = {
    get,
    getForOnePost,
    add,
    remove
}