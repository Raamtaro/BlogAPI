import commentController from "../controllers/commentController.js";
import { Router } from "express";
import validationMiddleware from "../middlewares/validationMiddleware.js";
const router = Router();

router.get('/', commentController.retrieveAllComments)
router.get('/comment', commentController.retrieveComment)
router.post('/comment', validationMiddleware.validateCommentMod, commentController.createComment)
router.put('/comment', validationMiddleware.validateCommentMod, commentController.editComment)
router.delete('/comment', commentController.deleteComment)

export default router