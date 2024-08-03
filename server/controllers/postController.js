import asyncHandler from 'express-async-handler'

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const getAllPosts = asyncHandler(async (req, res) => {
    const allPosts = await prisma.posts.findMany()
    res.status(200).json({allPosts})
})

const getPost = asyncHandler(async (req, res) => {
    const id = req.body.id 
    const retrievedPost = await prisma.posts.findUnique({
        where: {id: id}
    })
    res.status(200).json({retrievedPost})
})

const createPost = asyncHandler(async (req, res) => {
    const {title, body, authorId} = req.body

    if (!title || !body || !authorId) {
        return res.status(400).json({error: "title, body, authorId are all required"})
    }
    const post = await prisma.posts.create({
        data: {
            title,
            body,
            author: {connect: {id: authorId}}
        }
    })
    res.status(201).json({post})
})

const updatePost = asyncHandler(async (req, res) => {
    
})

const deletePost = asyncHandler(async (req, res) => {
    
})

export default {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}