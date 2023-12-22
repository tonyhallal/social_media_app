/**********************************************************************
 File: post-controller.js
 Author: Tony Hallal
 Date: 11/10.2023
 Description: Handles request validators for post-related operations
 and delegates to post services.
 **********************************************************************/
import {PostService} from "../services/post-service.js";
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
 * adds a post to the database. Returns an object describing the database modification and providing a descriptive
 * message of the addition process. Returns an error message in case of an error.
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export const addPost = async (req, res) => {
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
 * handles finding an image for the given post
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const findImage = async (req, res) => {
    try {
        const {post_id} = req.params;
        res.status(200).send(await PostService.findImage(post_id));
    } catch (err) {
        res.status(500).send(err.message);
    }
}

/**
 * handles rendering the page that contains the form to add posts
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const addPostForm = async (req, res) => {
    res.render('new-post-form')
}