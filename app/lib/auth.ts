import { setJwtToken, setRefreshToken } from "./jwt"

export const logIn: (params: {email: string, password: string}) => Promise<{accessToken: string, refreshToken: string}> = async (params) => {

    const { email, password } = params 

    let response = await fetch(`http://localhost:5000/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email, password: password})
    })

    if (response.status != 200) throw new Error(response.statusText)

    let resBody = await response.json()

    setJwtToken(resBody.accessToken)
    setRefreshToken(resBody.refreshToken)

    return {accessToken: resBody.accessToken, refreshToken: resBody.refreshToken}
}