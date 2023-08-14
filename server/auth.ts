import { Request, Response } from "express"
import { LogInReqBody } from "./types"
import { jwt } from "./express"

const express = require("express")
const app = express()
app.use(express.json())

require("dotenv").config()

// Authenticate user and return token
app.post('/login', (req: Request, res: Response) => {

    const body: LogInReqBody = req.body

    const {email} = body

    const user = { email: email }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    res.json({accessToken: accessToken})

})