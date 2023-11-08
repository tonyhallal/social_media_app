/*******************************************************************
 File: user.route.js
 Author: Tony Hallal
 Date: 11/10/2023
 Description: Routes for posts CRUD operations
 ******************************************************************/

import express from "express";
import {addPost, deletePost, findPosts, updatePost} from "../controllers/post-controller.js";
import {insertPostValidation, updatePostValidation} from "../validation/post-validator.js";

const postRouter = express.Router();

postRouter.get('/posts/:id',findPosts);
postRouter.post('/post',insertPostValidation,addPost);
postRouter.put('/post/:id',updatePostValidation,updatePost);
postRouter.delete('/post/:id',deletePost);

export default postRouter;