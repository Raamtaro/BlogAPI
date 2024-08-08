import asyncHandler from 'express-async-handler'
import { PrismaClient } from "@prisma/client";
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

const retrieveAllComments = asyncHandler(async (req, res) => {
    const allComments = await prisma.comments.findMany();
    res.status(200).json(allComments)
}) 

const retrieveComment = asyncHandler(async (req, res) => {
    const id = req.body.id
    if (!id) {return res.status(400).json({error: "Invalid request: please specify id"})}

    const comment = await prisma.comments.findUnique({
        where: {
            id: id
        }
    })
    res.status(200).json(comment)
})

const createComment = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json( {
            error: errors.array()
        })
    }

    const client = req.user
    const {body, postId} = req.body
    try {    
        const newComment = await prisma.comments.create(
            {
                data: {
                    body,
                    author: {connect: {id: client.id}},
                    post: {connect: {id: postId}}
                }
            }
        )
        res.status(201).json(newComment)
    } catch (error) {
        if (error instanceof prisma.PrismaClientValidator) {
            return res.status(400).json({error: 'Invalid field provided'})
        }
        res.status(500).json({error: "Failed to create comment"})
    }
})

const editComment = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json( {
            error: errors.array()
        })
    }
    const client = req.user
    const {id, body}  = req.body

    //Check the comment we're about to update to see if it's authorId matches the client.id
    const commentToBeUpdated = await prisma.comments.findUnique(
        {
            where: {id: id}
        }
    )

    if (!(commentToBeUpdated.authorId === client.id)) {
        return res.status(403).json(
            {
                error: "Forbidden: Can't update another user's comment"
            }
        )
    }
    
    try {
        const comment = await prisma.comments.update({
            where: {
                id: id
            },
            data: {body: body}
        })
        res.status(200).json(comment)
    } catch (error) {
        return res.status(400).json({error: `failed to update comment: ${error}`})
    }
})

const deleteComment = asyncHandler(async (req, res) => {
    const id = req.body.id
    const client = req.user

    //grab the comment that we're about to delete
    const commentToBeDeleted = await prisma.comments.findUnique(
        {
            where: {id: id}
        }
    )

    //Check if the person making the request is the same as the author od the comment
    if(!(commentToBeDeleted.authorId === client.id)) {
        return res.status(403).json({
            error: "Forbidden: Can't delete another user's comment"
        })
    }

    //Otherwise, carry on
    try {
        await prisma.comments.delete({
            where: {
                id: id
            }
        })
        res.status(200).json({body: "Comment Deleted"})
    } catch (error) {
        res.status(400).json({error: `failed to delete comment: ${error}`})
    }
})




export default {
    retrieveAllComments,
    retrieveComment,
    createComment,
    editComment,
    deleteComment
}