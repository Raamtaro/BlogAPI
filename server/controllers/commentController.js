import asyncHandler from 'express-async-handler'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const retrieveAllComments = asyncHandler(async (req, res) => {
    const allComments = await prisma.comments.findMany();
    res.status(200).json(allComments)
}) 

const createComment = asyncHandler(async (req, res) => {

})
export default {
    retrieveAllComments
}