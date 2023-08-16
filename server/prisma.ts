import { PrismaClient } from '@prisma/client'
import { ErrorObject, PostParams, UserObj, UserParams } from './types'
const prisma = new PrismaClient()

export const createUser = async (params: UserParams) => {

    try {
        let user: UserObj = await prisma.user.create({
            data: {
                ...params.userParams,
                userPreference: {
                    create: {
                        emailUpdates: params.userPreferenceParams.emailUpdates
                    }
                }
            },
        })

        return user
    } catch (e:any) {

        let errorObject: ErrorObject = {code:400,message:e.message}
        return errorObject
    }
}

export const getAllUsers = async () => {

    let val = await prisma.user.findMany()

    return val
}

export const deleteAllUsers = async () => {


    let val = await prisma.user.deleteMany()

    return val
}

export const getUser = async (uid: string) => {

    try {
        let val = await prisma.user.findUnique({
            where: {
                id: uid
            }
        })

        if (val === null) throw new Error("No user found")

        return val
    } catch (e:any) {
        let errorObject: ErrorObject = {code:400,message:e.message}

        return errorObject
    }
}

export const deleteUser = async (uid: string) => {

    try {
        let val = await prisma.user.delete({
            where: {
                id: uid
            }
        })

        if (val === null) throw new Error("User couldn't be deleted")

        return val
    } catch (e:any) {
        let errorObject: ErrorObject = {code:400,message:e.message}

        return errorObject
    }
}

export const verifyUser = async (params: {email: string, password: string}) => {

    try {

        const {email, password} = params

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
    
        if (!user) throw new Error("No such email")
        if (user.password != password) throw new Error("Wrong password given")
    
        return user
    } catch (e: any) {

        return {code: 400, message: e.message}
    }

}

export const createPost = async (params: PostParams) => {

    const postParams = {title: params.postParams.title, post: params.postParams.post, image: params.postParams.image}

    console.log(params)
    try {
        let post = await prisma.post.create({
            data: {
                ...postParams, 
                author: {
                    connect: {
                        id: params.postParams.authorId
                    }
                }
            }
        })

        return post
    } catch (e:any) {

        let errorObject: ErrorObject = {code:400,message:e.message}
        return errorObject
    }
}

export const getPost = async (id: string) => {

    try {
        let val = await prisma.post.findUnique({
            where: {
                id: id
            }
        })

        if (val === null) throw new Error("No post found")

        return val
    } catch (e:any) {
        let errorObject: ErrorObject = {code:400,message:e.message}

        return errorObject
    }
}

export const getAllPosts = async () => {
    
    let val = await prisma.post.findMany()

    return val
}

export const deletePost = async (id: string) => {

    try {
        let val = await prisma.post.delete({
            where: {
                id: id
            }
        })

        if (val === null) throw new Error("Post couldn't be deleted")

        return val
    } catch (e:any) {
        let errorObject: ErrorObject = {code:400,message:e.message}

        return errorObject
    }
}

export const deleteAllPosts = async () => {


    let val = await prisma.post.deleteMany()

    return val
}