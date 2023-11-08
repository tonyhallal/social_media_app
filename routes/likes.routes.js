/*******************************************************************************
 File: likes.routes.js
 Author: Tony Hallal
 Date: 5/11/2024
 Description: Routes for likes create, read and delete operations
 ******************************************************************************/
import express from "express";
import {LikeService} from "../services/likes-service.js";

const likesRouter = express.Router();

likesRouter.get('/likes/:id', LikeService.get);
likesRouter.post('/like', LikeService.add);
likesRouter.delete('/like/:id', LikeService.remove);

export default likesRouter;