import { Request, Response } from "express"
import { LogInReqBody } from "./types"
import { createClient } from "redis"
import { verifyUser } from "./prisma"
import { catchError } from "./error"

const jwt = require("jsonwebtoken")

const express = require("express")
const app = express()
app.use(express.json())

require("dotenv").config()

const pubClient = createClient();

pubClient.connect()
    .catch(e => console.log(e))


// Authenticate user and return token
app.post('/login', async (req: Request, res: Response) => {

    const body: LogInReqBody = req.body


    const { email, password } = body

    let resObj = await catchError(verifyUser, {email: email, password: password})

    if (resObj.code !== 200) {
        return res.status(resObj.code).send(resObj.message)
    } 

    let resMessage = JSON.parse(resObj.message ?? "{id: null}")

    if (!resMessage.id) return res.status(406).send("No uid provided")

    const user = { uid: JSON.parse(resObj.message ?? "{uid: null}").id }

    if (!user.uid) return res.status(400).send("Issue occures")

    console.log(user)

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    

    pubClient.set(refreshToken, refreshToken)

    res.json({accessToken: accessToken, refreshToken: refreshToken})

})

app.delete('/logout', (req: Request, res: Response) => {

    pubClient.del(req.body.token)

    res.sendStatus(204)
})

app.get('/refreshTokens', async (req: Request, res: Response) => {
    
    let refreshTokens

    await pubClient.keys('*')
        .catch(e => console.log(e))
        .then(e => refreshTokens = e)

    res.send(refreshTokens)
})
app.post('/token', async (req: Request, res: Response) => {

    const refreshToken = req.body.token

    const refreshTokens = await pubClient.keys('*')

    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: any, user: any) => {
        if (err) return res.status(403).send(err)

        const accessToken = generateAccessToken( {uid: user.uid} )
        res.json({ accessToken: accessToken })
    })
})

const generateAccessToken = (user: { uid: string }) => {

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
}


app.listen(5000, () => console.log("Server Running"))