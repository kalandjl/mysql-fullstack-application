export const logIn: (params: {email: string, password: string}) => Promise<{accessToken: string, refreshToken: string}> = async (params) => {

    const { email, password } = params 

    let response = await fetch(`http://localhost:5000/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email, password: password})
    })

    let resBody = await response.json()
    
    return {accessToken: resBody.accessToken, refreshToken: resBody.refreshToken}
}