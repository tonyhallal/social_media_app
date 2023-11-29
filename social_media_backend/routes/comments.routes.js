/*********************************************************************************************************************
 File: comments.routes.js
 Author: Tony Hallal
 Date: 12/11/2023
 Description: routes for comments create read and delete operations.
*********************************************************************************************************************/
import express from "express";
import {addComment, deleteComment, findCommentsByPostId} from "../controllers/comments-controller.js";
import {addCommentValidator} from "../validators/comments-validator.js";

const commentsRouter = express.Router();

commentsRouter.get('/comments/:post_id',findCommentsByPostId);
commentsRouter.post('/comment',addCommentValidator, addComment);
commentsRouter.delete('/comment/:comment_id',deleteComment);

export default commentsRouter;