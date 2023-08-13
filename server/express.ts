import { Request, Response } from "express"
import { UserRequestBody } from "./types"
import { createUser, deleteAllUsers, getAllUsers } from "./prisma"
const express = require("express")
const app = express()
app.use(express.json())

app.post('/create-user', async (req: Request, res: Response) => {
    
    let body: UserRequestBody = req.body
    let {name, email, age} = body
    let {emailUpdates} = body.userPreference
    createUser({userParams: {name,email,age}, userPreferenceParams: {emailUpdates}}).then(x => {
        if (x === 404) {
            res.sendStatus(400)
        } else {
            console.log(x)
            res.send(x)
        }
    })
        
})

app.get('/get-all-users', async (req: Request, res: Response) => {

    let users = await getAllUsers()

    res.send(users)
})

app.get('/delete-all-users', async (req: Request, res: Response) => {

    await deleteAllUsers()
        .catch(e => {console.log(e.message); return res.sendStatus(300);})
        .then(() => {
            return res.sendStatus(200)
        })
})
app.listen(3001, () => console.log("Server Running"))