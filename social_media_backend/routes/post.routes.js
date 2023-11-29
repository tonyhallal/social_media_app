/*******************************************************************
 File: user.routes.js
 Author: Tony Hallal
 Date: 11/10/2023
 Description: Routes for posts CRUD operations
 ******************************************************************/

import express from "express";
import {addPost, deletePost, findPosts, findPostsForOneUser, updatePost} from "../controllers/post-controller.js";
import {addPostValidator, updatePostValidator} from "../validators/post-validator.js";

const postRouter = express.Router();

postRouter.get('/posts/:user_id',findPosts);
postRouter.get('/posts/for-user-profile/:user_id',findPostsForOneUser)
postRouter.post('/post',addPostValidator, addPost);
postRouter.put('/post',updatePostValidator, updatePost);
postRouter.delete('/post/:post_id',deletePost);

export default postRouter;