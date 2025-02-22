import express from "express";
import router from "./routes/index.js"
import { configDotenv } from "dotenv";

import session from "express-session";
import passport from "passport";
import { PrismaClient } from "@prisma/client";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { localStrategy } from "./config/passportLocalStrategy.js";
import { jwtStrategy } from "./config/passportJwtStrategy.js";

import cors from 'cors'


configDotenv()

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    store: new PrismaSessionStore(
        prisma,
        {
            CheckPeriod: 2 * 60 * 1000, 
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    
    ),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

passport.use(localStrategy)
passport.use(jwtStrategy)
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done)=> done(null, user.id))
passport.deserializeUser(async (id, done)=> {
    try {
        const user = await prisma.user.findUnique({ where: {id}})
        done(null, user)
    } catch (error) {
        done(error)
    }
})

app.use('/users', router.users)
app.use('/posts', router.posts)
app.use('/comments', router.comments)
app.use('/auth', router.auth)

app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).send("Something Broke!")
})

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})