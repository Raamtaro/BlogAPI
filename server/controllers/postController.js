import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const getAllPosts = asyncHandler(async (req, res) => {
    const allPosts = await prisma.posts.findMany({
        include: {author: true}
    })
    res.status(200).json({allPosts})
})

const getPost = asyncHandler(async (req, res) => {
    const id = req.body.id 
    const retrievedPost = await prisma.posts.findUnique({
        where: {id: id},
        include: {
            comments: true
        }

    })
    res.status(200).json({retrievedPost})
})

const createPost = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( {
            error: errors.array()
        })
    }


    const {title, body, authorId} = req.body

    if (!title || !body || !authorId) {
        return res.status(400).json({error: "title, body, authorId are all required"})
    }
    const post = await prisma.posts.create({
        data: {
            title,
            body,
            author: {connect: {id: authorId}},
            
        },

    })
    res.status(201).json({post})
})

const updatePost = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( {
            error: errors.array()
        })
    }
    //destructure the authorId and postIds
    const {id, authorId, body, title} = req.body

    //Check to see if the user has included all three in their request
    if (!id || !authorId || (!body && !title)) {
        return res.status(400).json({error: "Invalid Request: need id, authorId and body and/or title args"})
    }

    const updateData = {}
    if (body) updateData.body = body;
    if (title) updateData.title = title;

    try {
        const updatedPost = await prisma.posts.update({
            where: {
                id: id,
                authorId: authorId
            },
            data: {
                body: body,
                title: title
            }
        })
    } catch(error) {
        console.error(error)
        res.status(500).json( { error: "Failed to update the post"})
    }
})

const deletePost = asyncHandler(async (req, res) => {
    const {id, authorId} = req.body
    if (!id || !authorId) {
        return res.status(400).json({error: "Invalid Request: please provide both an id and corresponding authorId"})
    }
    try {
        await prisma.posts.delete({
            where: {
                id: id,
                authorId: authorId
            }
        })
        res.status(200).json({message: "User Deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Failed to delete the post"})
    }
})

export default {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}