import { Request, Response } from "express"
import { LogInReqBody } from "./types"
import { jwt } from "./express"

const express = require("express")
const app = express()
app.use(express.json())

require("dotenv").config()

let refreshTokens: string[] = []

// Authenticate user and return token
app.post('/login', (req: Request, res: Response) => {

    const body: LogInReqBody = req.body

    const {email} = body

    const user = { email: email }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)

    res.json({accessToken: accessToken, refreshToken: refreshToken})

})

app.delete('/logout', (req: Request, res: Response) => {

    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    console.log(refreshTokens)
    res.sendStatus(204)
})

app.get('/refreshTokens', (req: Request, res: Response) => {

    res.send(refreshTokens)
})
app.post('/token', (req: Request, res: Response) => {

    const refreshToken = req.body.token

    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: any, user: any) => {
        if (err) return res.status(403).send(err)

        const accessToken = generateAccessToken( {email: user.email} )
        res.json({ accessToken: accessToken })
    })
})

const generateAccessToken = (user: { email: string }) => {

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15s"})
}


app.listen(5000, () => console.log("Server Running"))