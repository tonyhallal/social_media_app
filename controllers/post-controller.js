/**********************************************************************
 File: post-controller.js
 Author: Tony Hallal
 Date: 11/10.2023
 Description: Handles request validation for post-related operations
 and delegates to post services.
 **********************************************************************/
import {PostService} from "../services/post-service.js";

//get posts by user id
export const findPosts = async (req, res) => {
    try {
        const user_id = req.params.id;
        res.status(200).send(await PostService.get(user_id));
    } catch (err) {
        res.status(500).send(err.message);
    }
}

//add new post
export const addPost = async (req, res) => {
    try {
        const {post} = req.body;
        res.status(200).send(await PostService.add(post))
    } catch (err) {
        res.status(500).send(err.message);
    }
}

//update post
export const updatePost = async (req, res) => {
    try {
        const {newPost} = req.body;
        const post_id = req.params.id;
        return res.send(await PostService.update(post_id, newPost))
    } catch (err) {
        res.status(500).send(err.message);
    }
}

//delete post
export const deletePost = async (req, res) => {
    try {
        const post_id = req.params.id;
        res.status(200).send(await PostService.remove(post_id));
    } catch (err) {
        res.status(500).send(err.message);
    }
}