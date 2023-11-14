/***************************************************************************
 File: like-controller.js
 Author: Tony Hallal
 Date: 12/10/2023
 Description: handles incoming socket events and delegates to likes service.
 ****************************************************************************/
import {LikeService} from "../services/likes-service.js";

/**
 * returns like count.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const getLikes = async (req, res) => {
    try {
        const post_id = req.params.id;
        res.status(200).send(await LikeService.get(post_id));
    } catch (err) {
        res.status(404).send('post not found');
    }
}
/**
 *
 * @param req
 * @param res
 * add a like to the database.
 * @returns {Promise<void>}
 */
export const addLike = async (req, res) => {
    try {
        const {like} = req.body;
        await res.status(201).send(await LikeService.add(like));
    } catch (err) {
        res.status(400).send(err.message);
    }
}
/**
 *
 * @param req
 * @param res
 * removes a like.
 * @returns {Promise<void>}
 */
export const removeLike = async (req, res) => {
    try {
        const like_id = req.params.id;
        res.status(200).send(await LikeService.remove(like_id));
    } catch (err) {
        res.status(404).send('like not found')
    }
}