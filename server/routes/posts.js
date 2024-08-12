import { Router } from "express";
import postController from "../controllers/postController.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
import passport from "passport";

const router = Router()

router.get('/', postController.getAllPosts)
// router.get('/post', postController.getPost)
router.get('/userposts', passport.authenticate('jwt', {session: false}), postController.getCurrentUserPosts)
router.post('/post', passport.authenticate('jwt', {session: false}), validationMiddleware.validatePostMod, postController.createPost)
router.put('/post', passport.authenticate('jwt', {session: false}), validationMiddleware.validatePostMod, postController.updatePost)
router.delete('/post', passport.authenticate('jwt', {session: false}), postController.deletePost)

export default router