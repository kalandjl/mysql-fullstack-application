
export const signUpFormOnSubmit = async (params: {email: string, password: string, name: string, age: number}) => {

    const {email, password, name, age} = params

        //...
    // Make the login API call
    let response = await fetch(`http://localhost:4000/create-user`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({...params, userPreference: {emailUpdates: false}})
    })
    
    if (response.status !== 200) throw new Error("Error") 

    response = await fetch(`http://localhost:5000/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email, password: password})
    })

    console.log(await response.json())
}