/*******************************************************************
 File: user.routes.js
 Author: Tony Hallal
 Date: 11/10/2023
 Description: Routes for posts CRUD operations
 ******************************************************************/

import express from "express";
import {
    addPost, addPostForm,
    findImage,
    findPosts,
} from "../controllers/post-controller.js";
import {upload} from "../config/multer.js";

const postRouter = express.Router();

postRouter.get('/posts/:username', findPosts);
postRouter.post('/add-one-post/:username', upload.single('post_attachment'), addPost);
postRouter.get('/img/:post_id', findImage)
postRouter.get('/new-post', addPostForm)
export default postRouter;