import {check} from "express-validator";

export const addLikeValidator = [
    check('post_id').notEmpty().withMessage('post_id is missing'),
    check('user_id').notEmpty().withMessage('user_id is missing')
]