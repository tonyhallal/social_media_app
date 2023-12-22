/*******************************************************************************************************************
 File: comments-controller.js
 Author: Tony Hallal
 Date: 12/11/2023
 Description: handles request validators for comments and delegates to the comments service.
 *******************************************************************************************************************/
import {CommentsService} from "../services/comments-service.js";
import {validationResult} from "express-validator";

/**
 * Validates the request by checking if the request is sent with a post ID. Finds all the comments for one post.
 * Returns an array of comments if succeeded. Returns an error message in case of failure.
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const findCommentsByPostId = async (req, res) => {
    const post_id = req.params.post_id;
    try {
        const comments = await CommentsService.getForOnePost(post_id);
        res.render(`comments`, { comments, post_id });
    } catch (err) {
        return res.status(404).send({errorMessage: `post id with id: ${post_id} not found.`})
    }
}

/**
 * Validates incoming request by checking if it contains a comment ID, a post ID and comment content. Returns a response
 * describing the database altering in case of success. Returns an error message in case of failure.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const addComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }

    const {user_id, post_id, comment_content} = req.body;
    try {
        await CommentsService.add(user_id, post_id, comment_content);
        res.redirect(`/api/v1/comments/${post_id}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
}