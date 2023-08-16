
// Short duration JWT token (5-10 min)
export function getJwtToken() {

    if (typeof window !== 'undefined') {

        return sessionStorage.getItem("jwt")
    } else {
        return 
    }
}

export function setJwtToken(token: string) {

    if (typeof window !== 'undefined') {
        
        sessionStorage.setItem("jwt", token)
    } else {
        return undefined
    }
}

// Longer duration refresh token (30-60 min)
export function getRefreshToken() {

    if (typeof window !== 'undefined') {

        return sessionStorage.getItem("refreshToken")
    } else {
        return 
    }
}

export function setRefreshToken(token: string) {

    if (typeof window !== 'undefined') {

        sessionStorage.setItem("refreshToken", token)
    } else {
        return undefined
    }
}

export const deleteJwtToken = () => {

    if (typeof window !== 'undefined') {

        sessionStorage.removeItem("jwt")
    } else {
        return
    }
}

export const deleteRefreshToken = () => {

    if (typeof window !== 'undefined') {

        sessionStorage.removeItem("refreshToken")
    } else {
        return
    }
}

export const getNewToken: (refreshToken: string) => Promise<{token: string}> = async (refreshToken) => {

    let response = await fetch(`http://localhost:5000/token`, {
        method: "POST",
        body: JSON.stringify({token: refreshToken}),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (response.status != 200) throw new Error(response.statusText)


    let token = (await response.json()).accessToken

    console.log(token)

    return { token: token }
}

export const jwtExpiredVerify = async (tokens: {token: string, refreshToken: string}, url: string, headers: {[x: string]: any}, fetchParams: {[x: string]: any}) => {

    const { token, refreshToken } = tokens
    
    let response = await fetch(url, {
        ...fetchParams,
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`, 
        }
    })

    if  (response.status != 200) if (response.status != 401) throw new Error(response.statusText)
    // @ts-ignore
    else if (response.status === 200) return response

    const newToken = (await getNewToken(refreshToken)).token

    if (!newToken) throw new Error("Error occured while getting new token")

    response = await fetch(url, {
        ...fetchParams,
        headers: {
            ...headers,
            'Authorization': `Bearer ${newToken}`, 
        }
    })

    setJwtToken(newToken)

    return response
}

export const getTokens: () => {token: string, refreshToken: string} = () => {


    const token = getJwtToken()
    const refreshToken = getRefreshToken()

    if (!token) throw new Error("Error occured while getting token")
    if (!refreshToken) throw new Error("No refresh token valid")

    return ({token: token, refreshToken: refreshToken})
}