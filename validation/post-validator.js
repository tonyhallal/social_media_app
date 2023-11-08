import {check} from "express-validator";

export const insertPostValidation = [
    check('post_attachment').notEmpty().withMessage('post must have an attachment (image or video)')
]

export const updatePostValidation = [
    check('id').notEmpty().withMessage('post id must not be empty'),
check('post_attachment').notEmpty().withMessage('post must have an attachment (image or video)')
]

