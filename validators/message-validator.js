import {check} from "express-validator";

export const loadMessagesValidator = [
    check('sender_id').notEmpty().withMessage('sender id is missing'),
    check('receiver_id').notEmpty().withMessage('receiver id is missing')
]