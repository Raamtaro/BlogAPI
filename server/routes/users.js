import { Router } from "express";
import userController from "../controllers/userController.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
const router = Router();


router.get('/', userController.getAllUsers)
router.get('/user', userController.retrieveUserbyID)
router.post('/newuser', validationMiddleware.validateUserCreation, userController.createSampleUser) 
router.put('/user', validationMiddleware.validateUserUpdate, userController.updateUser)
router.delete('/user', userController.deleteUser)

export default router
