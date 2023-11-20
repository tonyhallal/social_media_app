import {check} from "express-validator";

export const authValidator = [
    check('user_username').notEmpty().withMessage('username is missing'),
    check('user_password').notEmpty().withMessage('password is missing')
]