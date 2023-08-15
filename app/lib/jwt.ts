// Short duration JWT token (5-10 min)
export function getJwtToken() {

    if (typeof window !== 'undefined') {

        return sessionStorage.getItem("jwt")
    } else {
        return undefined
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
        return undefined
    }
}

export function setRefreshToken(token: string) {

    if (typeof window !== 'undefined') {

        sessionStorage.setItem("refreshToken", token)
    } else {
        return undefined
    }
}
