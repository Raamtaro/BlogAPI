import commentController from "../controllers/commentController.js";
import { Router } from "express";
import validationMiddleware from "../middlewares/validationMiddleware.js";
import passport from 'passport'
const router = Router();

router.get('/', commentController.retrieveAllComments)
router.get('/comment', commentController.retrieveComment)
router.post('/comment', passport.authenticate('jwt', {session: false}), validationMiddleware.validateCommentMod, commentController.createComment)
router.put('/comment', passport.authenticate('jwt', {session: false}), validationMiddleware.validateCommentMod, commentController.editComment)
router.delete('/comment', passport.authenticate('jwt', {session: false}), commentController.deleteComment)

export default router