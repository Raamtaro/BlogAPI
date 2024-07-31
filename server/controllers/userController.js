import asyncHandler from 'express-async-handler'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();