import asyncHandler from 'express-async-handler'
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator';


const prisma = new PrismaClient();

const getAllUsers = asyncHandler(async (req, res) => {
    //prisma query (findmany()) to get users
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers)
})

const createSampleUser = asyncHandler(async (req, res) => {
    //Eventually users are only going to be created via logging them in - this may come in handy there.
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
    res.status(201).json({user});


})

const retrieveUserbyID = asyncHandler(async (req, res) => {
    const id = req.body.id
    if(!id) {return res.status(400).json({error: "Invalid request: id required"})}
    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        // include: {
        //     posts: true
        // }
    })
    res.status(200).json({user})
})

const updateUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( {
            error: errors.array()
        })
    }

    const {id, ...updateData} = req.body
    if (!id) {return res.status(400).json({error: "Invalid request: id required"})}

    try {
        const user = await prisma.user.update({
            where: {id: Number(id)},
            data: updateData
        })
        res.status(200).json({ user })
    } catch (error) {
        console.error(error)
        if (error instanceof prisma.PrismaClientValidationError) {
            return res.status(400).json({ error: 'Invalid field provided' });
        }
        res.status(500).json({ error: "Failed to Update User"})
    }

})

const deleteUser = asyncHandler(async (req, res)=> {
    const {id, ...extras} = req.body

    //Helpers
    const isObjectEmpty = (obj) => {
        console.log(obj)
        return Object.keys(obj).length === 0;
    }

    const isUserAuthor = (userRecord) => {
        return userRecord.posts ? true : false
    }


    const containsExtras = isObjectEmpty(extras)

    //Checks
    if(!id) return res.status(400).json({error: "Invalid request: id required"})
    if (!containsExtras) {return res.status(400).json({error: "Invalid request: too many fields provided"})}

    try {
        await prisma.user.delete({
            where: {id: id}
        })
        res.status(200).json({message: 'user deleted successfully'})
    } catch (error) {
        res.status(400).json({error: `Request to delete user with id ${id} has failed. ${error}`})
    }


})

export default {
    getAllUsers, 
    createSampleUser,
    retrieveUserbyID,
    updateUser,
    deleteUser
}