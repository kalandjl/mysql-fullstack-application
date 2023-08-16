import { logIn } from "./auth"
import { getJwtToken, getRefreshToken, setJwtToken, setRefreshToken } from "./jwt"

export const signUpFormOnSubmit = async (params: {email: string, password: string, name: string, age: number}) => {

    const {email, password, name, age} = params

        //...
    // Make the login API call
    let response: any = await fetch(`http://localhost:4000/create-user`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({...params, userPreference: {emailUpdates: false}})
    })
    
    if (response.status !== 200) throw new Error(response.statusText) 

    let user = await response.json()

    response = await logIn({email: email, password: password})

    console.log(await response)
}

export const logInFormOnSubmit = async (params: {email: string, password: string}) => {

    let { accessToken, refreshToken} = await logIn(params)
}