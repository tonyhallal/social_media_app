/*******************************************************************************
 File: likes.routes.js
 Author: Tony Hallal
 Date: 5/11/2024
 Description: Routes for likes create, read and delete operations
 ******************************************************************************/
import express from "express";
import {addLike, getLikes, removeLike} from "../controllers/like-controller.js";
import {addLikeValidator} from "../validators/likes-validator.js";

const likesRouter = express.Router();

likesRouter.get('/likes/:post_id', getLikes);
likesRouter.get('/add-like/:user_id/:username/:post_id', addLike);
likesRouter.get('/remove-like/:user_id/:username/:post_id', removeLike);

export default likesRouter;