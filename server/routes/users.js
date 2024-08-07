import { Router } from "express";
import passport from "passport";
import userController from "../controllers/userController.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
const router = Router();


router.get('/', userController.getAllUsers)
router.get('/user', userController.retrieveUserbyID)
router.post('/newuser', passport.authenticate('jwt', {session: false}), validationMiddleware.validateUserCreation, userController.createSampleUser) 
router.put('/user', passport.authenticate('jwt', {session: false}), validationMiddleware.validateUserUpdate, userController.updateUser)
router.delete('/user', passport.authenticate('jwt', {session: false}), userController.deleteUser)

export default router
