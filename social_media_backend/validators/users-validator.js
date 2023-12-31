import {check} from "express-validator";

export const addUserValidator = [
    check('user_username').notEmpty().withMessage('username is missing'),
    check('user_username').isLength({min: 4}).withMessage('username should be at least 4 characters'),
    check('user_password').notEmpty().withMessage('password is missing'),
    check('user_password').isStrongPassword().withMessage('password is not strong')
]

export const updateUserValidator = [
    check('user_id').notEmpty().withMessage('user ID is missing'),
    check('user_username').isLength({min: 4}).withMessage('username should be at least 4 characters'),
    check('user_email').isEmail().withMessage('invalid email'),
    check('user_password').isStrongPassword().withMessage('password is not strong')
]