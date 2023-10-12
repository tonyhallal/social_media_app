/*******************************************************************
 File: user.route.js
 Author: Tony Hallal
 Date: 11/10/2023
 Description: Routes for posts CRUD operations
 ******************************************************************/

import express from "express";
import {addPost, deletePost, findPostsById, updatePost} from "../controllers/post-controller.js";

const postRouter = express.Router();

postRouter.get('/posts/:id',findPostsById);
postRouter.post('/post',addPost);
postRouter.put('/post/:id',updatePost);
postRouter.delete('/post/:id',deletePost);

export default postRouter;