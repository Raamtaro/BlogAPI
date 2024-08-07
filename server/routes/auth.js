import { Router } from "express";
import passport from "passport";
import authController from "../controllers/authController.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

const router = Router()

router.post('/register', validationMiddleware.validateUserCreation, authController.registerUser)
router.post('/login',  authController.loginUser)
router.get('/profile', passport.authenticate('jwt', {session: false}), authController.getProfile)

export default router