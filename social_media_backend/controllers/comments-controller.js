/*******************************************************************************************************************
 File: comments-controller.js
 Author: Tony Hallal
 Date: 12/11/2023
 Description: handles request validators for comments and delegates to the comments service.
 *******************************************************************************************************************/
import {CommentsService} from "../services/comments-service.js";
import {validationResult} from "express-validator";

/**
 * Finds all the comments. Returns an array of comments if succeeded. Returns an error message in case of failure.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const findAllComments = async (req, res) => {
    try {
        res.status(200).send(await CommentsService.get());
    } catch (err) {
        res.status(500).send(err.message);
    }
}

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
        res.status(200).send(await CommentsService.getForOnePost(post_id));
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
        res.status(201).send(await CommentsService.add(user_id, post_id, comment_content));
    } catch (err) {
        res.status(500).send(err.message);
    }
}

/**
 * Validates incoming request by checking if it contains a comment ID. Returns a response describing the database
 * modification in case of success. Returns an error message in case of error.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const deleteComment = async (req, res) => {
    const {comment_id} = req.params;
    try {
        res.status(201).send(await CommentsService.remove(comment_id));
    } catch (err) {
        res.status(400).send(err.message);
    }
}