import {check} from "express-validator";

export const addCommentValidator = [
    check('user_id').notEmpty().withMessage('user ID is missing'),
    check('post_id').notEmpty().withMessage('post ID is missing'),
    check('comment_content').notEmpty().withMessage('comment content is empty')
]