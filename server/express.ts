import { Request, Response } from "express"
import { LogInReqBody, UserRequestBody } from "./types"
import { createUser, deleteAllUsers, deleteUser, getAllUsers, getUser } from "./prisma"
import { catchError } from "./error"
const express = require("express")
const app = express()
app.use(express.json())

require("dotenv").config()

const jwt = require("jsonwebtoken")

// Authenticate user and return token
app.post('/login', (req: Request, res: Response) => {

    const body: LogInReqBody = req.body

    const {email} = body

    const user = { email: email }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    res.json({accessToken: accessToken})

})

// Create a user with an email, name and age
app.post('/create-user', async (req: Request, res: Response) => {
    
    let body: UserRequestBody = req.body
    let {name, email, age} = body
    let {emailUpdates} = body.userPreference
    let resObj = await catchError(createUser, {userParams: {name,email,age}, userPreferenceParams: {emailUpdates}})
 
    if (resObj.message === undefined) {
        res.sendStatus(resObj.code)
    } else {
        //@ts-ignore
        res.send(resObj.message, resObj.code)
    }
})

//Returns information on a user given uid 
app.post('/get-user', async (req: Request, res: Response) => {

    let uid: string = req.body.uid
    let resObj = await catchError(getUser, uid)

    if (resObj.message === undefined) {
        res.sendStatus(resObj.code)
    } else {
        //@ts-ignore
        res.send(resObj.message, resObj.code)
    }
})

//Deletes a user given user id
app.post('/delete-user', async (req: Request, res: Response) => {

    let uid: string = req.body.uid
    let resObj = await catchError(deleteUser, uid)

    if (resObj.message === undefined) {
        res.sendStatus(resObj.code)
    } else {
        //@ts-ignore
        res.send(resObj.message, resObj.code)
    }
})

// Returns all database users
app.get('/get-all-users', async (req: Request, res: Response) => {

    let users = await getAllUsers()

    res.send(users)
})

// Deletes all database users
app.get('/delete-all-users', async (req: Request, res: Response) => {

    await deleteAllUsers()
        .catch(e => {console.log(e.message); return res.sendStatus(300);})
        .then(() => {
            return res.sendStatus(200)
        })
})
app.listen(3001, () => console.log("Server Running"))