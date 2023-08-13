import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(run: () => {}) {

    return run()
}


export const runAsyncPrisma = async (run: () => {}) => {

    let val = await main(run)
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
        return run()
    })

    return val
}



