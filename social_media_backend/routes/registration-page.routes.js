import express from "express";
import {renderRegistration} from "../controllers/registration-controller.js";

const mainRouter = express.Router();

mainRouter.get('/', renderRegistration);

export default mainRouter;