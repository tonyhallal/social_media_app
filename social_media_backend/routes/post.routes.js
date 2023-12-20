/*******************************************************************
 File: user.routes.js
 Author: Tony Hallal
 Date: 11/10/2023
 Description: Routes for posts CRUD operations
 ******************************************************************/

import express from "express";
import {
    addPost, addPostForm,
    deletePost,
    findImage,
    findPosts,
    findPostsForOneUser,
    updatePost
} from "../controllers/post-controller.js";
import {addPostValidator, updatePostValidator} from "../validators/post-validator.js";
import {upload} from "../config/multer.js";
import {test} from "../controllers/test-controller.js";
import {PostService} from "../services/post-service.js";

const postRouter = express.Router();

postRouter.get('/posts/:username',findPosts);
postRouter.get('/posts/for-user-profile/:user_id',findPostsForOneUser)
postRouter.post('/add-one-post/:username',upload.single('post_attachment'), addPost);
postRouter.put('/post',updatePostValidator, updatePost);
postRouter.delete('/post/:post_id',deletePost);
postRouter.get('/postsss', test)
postRouter.get('/img/:post_id', findImage)
postRouter.get('/new-post', addPostForm)
export default postRouter;