import asyncHandler from 'express-async-handler'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { validationResult } from 'express-validator'
import { configDotenv } from 'dotenv'
import { localStrategy } from '../config/passportLocalStrategy.js'

configDotenv();

const prisma = new PrismaClient();

const registerUser = asyncHandler(async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( {
            error: errors.array()
        })
    }


    const {email, password, name} = req.body;

    const existingUser = await prisma.user.findUnique({
        where: {email: email}
    })
    if (existingUser) {
        return res.status(400).json({error: 'Email is already in use'})
    }


    if (!email || !password) {
        return res.status(400).json({error: "Email and Password required"})
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
        email, 
        password: hashedPassword
    };

    if (name) userData.name = name;

    const user = await prisma.user.create({
        data: userData
    })

    const token = jwt.sign( { userId: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'}); //Updated from the userController module - generate the jwt

    res.status(201).json({user, token});
})

const loginUser = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({ error: info.message });
      }
      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ user, token });
    })(req, res, next);
  };
  



const getProfile = asyncHandler( async (req, res) => {
    res.json(req.user);
})

export default {
    registerUser,
    loginUser,
    getProfile
}

