import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import { PrismaClient } from "@prisma/client"
import { configDotenv } from 'dotenv'


configDotenv()
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

    const client = req.user
    const {title, body} = req.body


    if (!(client.role === "ADMIN")) {
        return res.status(403).json(
            {
                error: "Cannot create posts without ADMIN assignment"
            }
        )
    }

    if (!title || !body) {
        return res.status(400).json({error: "title and body cannot be empty"})
    }
    const post = await prisma.posts.create({
        data: {
            title,
            body,
            author: {connect: {id: client.id}},
            
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
    const client = req.user
    const {id, body, title} = req.body

    //Get the post that is to be updated
    const postToBeUpdated = await prisma.posts.findUnique( {
        where: {
            id: id
        }
    })

    //check that the client.id is the same as the authorId of the post that is being queried
    if (!(client.id === postToBeUpdated.authorId)) {
        return res.status(403).json(
            {
                error: "Forbidden - clientId must match authorId"
            }
        )
    }

    if (!body && !title) {
        return res.status(400).json(
            {
                error: "Invalid request - must include body and/or title"
            }
        )
    }

    // //Check to see if the user has included all three in their request
    // if (!id || !authorId || (!body && !title)) { //REDO: now that we're jwt verifying, a little bit more flexibility
    //     return res.status(400).json({error: "Invalid Request: need id, authorId and body and/or title args"})
    // }

    const updateData = {}
    if (body) updateData.body = body;
    if (title) updateData.title = title;

    try {
        const updatedPost = await prisma.posts.update({
            where: {
                id: id,
                // authorId: client.id don't need to include this anymore because we are verifying that the authorId is the correct one earlier on
            },
            data: {
                body: body,
                title: title
            }
        })
        res.status(200).json({updatedPost})
    } catch(error) {
        console.error(error)
        res.status(500).json( { error: "Failed to update the post"})
    }
})

const deletePost = asyncHandler(async (req, res) => {
    const client = req.user
    const id = req.body.id


    // if (!id || !authorId) { //Redo this check - client id against the authorId
    //     return res.status(400).json({error: "Invalid Request: please provide both an id and corresponding authorId"})
    // }

    //First, get the post that is to be deleted
    const postToBeDeleted = await prisma.posts.findUnique({
        where: {
            id: id
        }
    })

    if (!(client.id === postToBeDeleted.authorId)) {
        return res.status(403).json(
            {error: "Forbidden: Cannot Delete another User's Post"}
        )
    }

    
    try {
        await prisma.posts.delete({
            where: {
                id: id
            }
        })
        res.status(200).json({message: "Post Deleted"})
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