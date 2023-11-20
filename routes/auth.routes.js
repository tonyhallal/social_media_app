import express from "express";
import {authenticateUser} from "../controllers/auth-controller.js";
import {authValidator} from "../validators/auth-validator.js";

const authRouter = express.Router();

authRouter.post('/auth',authValidator,authenticateUser);

export default authRouter;