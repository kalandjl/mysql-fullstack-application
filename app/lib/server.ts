import { getJwtToken, getRefreshToken, getTokens, jwtExpiredVerify } from "./jwt"

export const getPosts = async () => {

    const tokens = getTokens()
    
    let posts = await (await jwtExpiredVerify(tokens, 'http://localhost:4000/get-posts', {'Content-type': 'application/json',}, {method: "GET"})).json()

    return posts
}

export const getUser = async (uid: string) => {

    const tokens = getTokens()
    
    let user = await (await jwtExpiredVerify(tokens, 'http://localhost:4000/get-user', {'Content-type': 'application/json'}, {method: "POST", body: JSON.stringify({"uid": uid})})).json()

    return user
}

export const getUsers = async () => {

    const tokens = getTokens()
    
    let user = await (await jwtExpiredVerify(tokens, 'http://localhost:4000/get-all-users', {'Content-type': 'application/json'}, {method: "GET"})).json()

    return user
}