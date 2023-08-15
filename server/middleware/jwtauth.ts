import { NextFunction, Request, Response } from "express";
require("dotenv").config()

const jwt = require("jsonwebtoken")

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
        //@ts-ignore
        if (err) return res.status(401).send(err)
        
        //@ts-ignore
        req.user = user
        next()
    })
}
