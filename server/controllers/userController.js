import asyncHandler from 'express-async-handler'
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'


const prisma = new PrismaClient();

const getAllUsers = asyncHandler(async (req, res) => {
    //prisma query (findmany()) to get users
    const allUsers = await prisma.user.findMany();
    res.send(Object.values(allUsers))
})

const createSampleUser = asyncHandler(async (req, res) => {
    //Eventually users are only going to be created via logging them in - this may come in handy there.
    const {email, password, name} = req.body;
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
    res.status(201).json({user});


})

const retrieveUserbyID = asyncHandler(async (req, res) => {
    const id = req.body.id
    if(!id) {return res.status(400).json({error: "id required"})}
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    res.status(200).json({user})
})

export default {
    getAllUsers, 
    createSampleUser,
    retrieveUserbyID
}