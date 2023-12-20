/**********************************************************************
 File: post-controller.js
 Author: Tony Hallal
 Date: 11/10.2023
 Description: Handles request validators for post-related operations
 and delegates to post services.
 **********************************************************************/
import {PostService} from "../services/post-service.js";
import {validationResult} from "express-validator";
import {UserService} from "../services/user-service.js";

/**
 * get all posts except ones for the logged-in user.
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export const findPosts = async (req, res) => {
    try {
        const {username} = req.params;
        const posts = await PostService.get();
        const user = await UserService.findByUsername(username);
        res.render('home-page', {posts, user});
    } catch (err) {
        res.status(500).send(err.message);
    }
}

/**
 * finds all the posts of a user. Returns an array containing the posts of this user in case of success. Returns an
 * error message in case of an error
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export const findPostsForOneUser = async (req, res) => {
    const {user_id} = req.params;
    try {
        res.status(200).send(await PostService.findById(user_id));
    } catch (err) {
        res.status(404).send(`User with id ${user_id} not found}`);
    }
}

/**
 * adds a post to the database. Returns an object describing the database modification and providing a descriptive
 * message of the addition process. Returns an error message in case of an error.
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export const addPost = async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     res.status(400).json({errors: errors.array()});
    //     return;
    // }
    try {
        const {username} = req.params;
        const {post_caption, user_id} = req.body;
        console.log('reached')
        const post_attachment = req.file.buffer;

        await PostService.add(post_caption, post_attachment, user_id)
        res.redirect(`/api/v1/posts/${username}`)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

/**
 * updates a post. Returns an object describing the database modification and providing a descriptive
 * message of the update process. Returns an error message in case of an error.
 * @param req
 * @param res
 * @return {Promise<*>}
 */
export const updatePost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }

    try {
        const {post_id, newPost} = req.body;
        return res.send({
            dbModification: await PostService.update(post_id, newPost),
            message: 'post updated successfully'
        })
    } catch (err) {
        res.status(500).send(err.message);
    }
}

/**
 * deletes a post. Returns an object describing the database modification and providing a descriptive
 * message of the deletion process. Returns an error message in case of an error.
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export const deletePost = async (req, res) => {
    try {
        const {post_id} = req.params;
        res.status(200).send({
            dbModification: await PostService.remove(post_id),
            message: 'post deleted successfully'
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const findImage = async (req, res) => {
    try {
        const {post_id} = req.params;
        res.status(200).send(await PostService.findImage(post_id));
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const addPostForm = async (req, res) => {
    res.render('new-post-form')
}