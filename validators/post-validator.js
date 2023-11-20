import {check} from "express-validator";

export const addPostValidator = [
    check('post_attachment').notEmpty().withMessage('post id is missing. post must have an attachment (image or video)'),
    check('user_id').notEmpty().withMessage('user_id is missing.')
]

export const updatePostValidator = [
    check('post_id').notEmpty().withMessage('post id must not be empty')
]

