import { Router } from "express";
import postController from "../controllers/postController.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

const router = Router()

router.get('/', postController.getAllPosts)
router.get('/post', postController.getPost)
router.post('/post', validationMiddleware.validatePostMod, postController.createPost)
router.put('/post', validationMiddleware.validatePostMod, postController.updatePost)
router.delete('/post', postController.deletePost)

export default router