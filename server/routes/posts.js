import { Router } from "express";
import postController from "../controllers/postController.js";

const router = Router()

router.get('/', postController.getAllPosts)
router.get('/post', postController.getPost)
router.post('/post', postController.createPost)
router.put('/post', postController.updatePost)
router.delete('/post', postController.deletePost)

export default router