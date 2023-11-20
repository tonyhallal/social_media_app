/***************************************************************************
 File: like-controller.js
 Author: Tony Hallal
 Date: 12/10/2023
 Description: handles incoming socket events and delegates to likes service.
 ****************************************************************************/
import {LikeService} from "../services/likes-service.js";
import {validationResult} from "express-validator";

/**
 * returns like count.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const getLikes = async (req, res) => {
    try {
        const {post_id} = req.params;
        res.status(200).send({
            likeCount: await LikeService.getForOnePost(post_id)
        })
    } catch (err) {
        res.status(500).send(err.message);
    }
}
/**
 * add a like to the database.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const addLike = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }

    try {
        const {user_id, post_id} = req.body;
        await res.status(201).send({
            dbModification: await LikeService.add(user_id, post_id),
            message: 'like added successfully'
        })
    } catch (err) {
        res.status(400).send(err.message);
    }
}
/**
 * removes a like.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const removeLike = async (req, res) => {
    try {
        const {like_id} = req.params;
        res.status(200).send({
            dbModification: await LikeService.remove(like_id),
            message: 'like deleted successfully'
        });
    } catch (err) {
        res.status(400).send(err.message)
    }
}