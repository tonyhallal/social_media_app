/*********************************************************************************************************************
 File: comments.routes.js
 Author: Tony Hallal
 Date: 12/11/2023
 Description: routes for comments create read and delete operations.
*********************************************************************************************************************/
import express from "express";
import {addComment, deleteComment, findAllComments, findCommentsByPostId} from "../controllers/comments-controller.js";

const commentsRouter = express.Router();

commentsRouter.get('/comments', findAllComments);
commentsRouter.get('/comments/:post_id',findCommentsByPostId);
commentsRouter.post('/comment',addComment);
commentsRouter.delete('/comment/:comment_id',deleteComment);

export default commentsRouter;