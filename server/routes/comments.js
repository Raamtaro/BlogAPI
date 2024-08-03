import commentController from "../controllers/commentController.js";
import { Router } from "express";
const router = Router();

router.get('/', commentController.retrieveAllComments)
router.get('/comment', commentController.retrieveComment)
router.post('/comment', commentController.createComment)
router.put('/comment', commentController.editComment)
router.delete('/comment', commentController.deleteComment)

export default router