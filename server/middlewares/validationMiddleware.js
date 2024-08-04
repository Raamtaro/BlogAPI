import { body } from 'express-validator'

const validateUserCreation = [
    body("email").trim()
        .isEmail().withMessage("Must be a valid email"),
    body("password").trim()
        .isLength({ min: 6}).withMessage("Must be at least 6 characters"),
    body("name").optional().trim()
        .isAlpha().withMessage("Must contain A-Z or a-z characters")
        .isLength({min: 3}).withMessage("Must be at least 3 characters")

]

const validateUserUpdate = [
    body("name").optional().trim()
        .isAlpha().withMessage("Must contain A-Z or a-z characters")
        .isLength({min: 3}).withMessage("Must be at least 3 characters")

]

const validatePostMod = [
    body("body").optional().trim()
        .isLength({min: 3, max: 2100}).withMessage("Must be 3-2100 characters")
        .isString().withMessage("Must be a string"),
    body("title").optional().trim()
        .isLength({min: 3, max: 59}).withMessage("Must be 3-59 characters")
        .isAlpha().withMessage("Must contain A-Z or a-z characters")

]


const validateCommentMod = [
    body("body").trim()
        .isLength({min: 1, max: 50}).withMessage("Must not exceed 50 characters")
        .isString().withMessage("Must be a string")
]



export default {
    validateUserCreation,
    validateUserUpdate,
    validatePostMod,
    validateCommentMod
}