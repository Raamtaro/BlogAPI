import { Router } from "express";
import userController from "../controllers/userController.js";
const router = Router();


router.get('/', userController.getAllUsers)
router.get('/user', userController.retrieveUserbyID)
router.post('/newuser', userController.createSampleUser)
// router.put('/:userid')
// router.delete('/:userid')

export default router
