import { getJwtToken, getRefreshToken, jwtExpiredVerify } from "./jwt"

export const getPosts = async () => {


    const token = getJwtToken()

    if (!token) throw new Error("Error occured while getting token")

    // let response = await fetch(`http://localhost:4000/get-posts`, {
    //     method: "GET", 
    //     headers: {
    //         'Content-type': 'application/json',
    //         'Authorization': `Bearer ${token}`, 
    //     }
    // })

    const refreshToken = getRefreshToken()

    if (!refreshToken) throw new Error("No refresh token valid")
    
    let posts = await (await jwtExpiredVerify(refreshToken, 'http://localhost:4000/get-posts', {'Content-type': 'application/json',}, {method: "GET"}, token)).json()

    console.log(posts)
    return posts
}