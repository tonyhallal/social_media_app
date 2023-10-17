/****************************************************************************************
 File: post-service.js
 Author: Tony Hallal
 Date: 11/10/2023
 Description: Contains all services related to likes. Handles sending likes count and
 likes, adding likes and removing likes.
 **********************************************************************************+*****/
import {query} from "../database/db.js";

//gets the like count
const getLikeCount = async (postId) => {
    try {
        const sql = `select count(*) as like_count from likes where post_id = ?`
        const [likeCountQuery] = await query(sql, [postId]);
        //return like count property
        return likeCountQuery.like_count;
    } catch (err) {
        throw new Error(err);
    }
}

//get likes
const getLikes = async (postId) => {
    try {
        const sql = 'select * from likes where post_id = ?'
        return await query(sql, [postId]);
    } catch (err) {
        throw new Error(err);
    }
}

//get likes and like count
const get = async (postId) => {
    try {
        const likeCount = await getLikeCount(postId);
        const likes = await getLikes(postId);
        return {
            likeCount,
            likes
        }
    } catch (err) {
        throw new Error(err);
    }
}

//add like
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

//delete like
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
    add,
    remove
}