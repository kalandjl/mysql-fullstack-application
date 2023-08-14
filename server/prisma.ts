import { PrismaClient } from '@prisma/client'
import { ErrorObject, UserObj, UserParams } from './types'
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