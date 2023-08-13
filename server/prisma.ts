import { PrismaClient } from '@prisma/client'
import { UserParams } from './types'
const prisma = new PrismaClient()


export const createUser = async (params: UserParams) => {

    try {
        let user = await prisma.user.create({
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
        console.log(e.message)
        return 404
    }
    
    
    // .catch(e => {
    //     console.log("Throwing err")
        
    // }).then(val => {
    //     console.log("Throwing nerr")
    //     return val
    // }).finally(async () => {
    //     await prisma.$disconnect()
    // })

}

export const getAllUsers = async () => {

    let val = await prisma.user.findMany()

    return val
}

export const deleteAllUsers = async () => {


    let val = await prisma.user.deleteMany()

    return val
}