import { NextFunction, Request, Response } from "express"
import { LogInReqBody, UserParams, UserRequestBody } from "./types"
import { createUser, deleteAllUsers, deleteUser, getAllUsers, getUser } from "./prisma"
import { catchError } from "./error"
import { authenticateToken } from "./middleware/jwtauth"
const express = require("express")
const app = express()
app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});

require("dotenv").config()

const jwt = require("jsonwebtoken")

app.get('/', (req: Request, res: Response) => {

    res.send("Main server")
})

// Create a user with an email, name and age
app.post('/create-user', async (req: Request, res: Response) => {
    
    console.log(req.body)

    let body: UserRequestBody = req.body
    let {name, email, age, password} = body

    if (!name || !email || !age || !password) return res.status(406).send("insuficient data")

    // @ts-ignore
    age = parseInt(age)

    let params = {name: name, email: email, age: age, password: password}
    let {emailUpdates} = body.userPreference
    let resObj = await catchError(createUser, {userParams: {name,email,age,password}, userPreferenceParams: {emailUpdates}})

    if (resObj.message === undefined) {
        res.sendStatus(resObj.code)
    } else {
        //@ts-ignore
        res.send(resObj.message, resObj.code)
    }
})

//Returns information on a user given uid 
app.post('/get-user', authenticateToken ,async (req: Request, res: Response) => {

    //@ts-ignore
    console.log(req.user)

    let uid: string = req.body.uid
    let resObj = await catchError(getUser, uid)

    
    if (resObj.message === undefined) {
        res.sendStatus(resObj.code)
    } else {
        //@ts-ignore
        res.send(resObj.message).status(resObj.code)
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
app.listen(4000, () => console.log("Server Running"))