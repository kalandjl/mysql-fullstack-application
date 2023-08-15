import { NextPage } from "next"
import Link from "next/link"
import { signUpFormOnSubmit } from "../../lib/requests"
import { useRef } from "react"

const Home: NextPage = () => {

    let emailRef = useRef(null)
    let ageRef = useRef(null)
    let nameRef = useRef(null)
    let passwordRef = useRef(null)

    const handleSubmit = (event: Event) => {

        // @ts-ignore
        let email = emailRef.current?.value
        // @ts-ignore
        let name = nameRef.current?.value
        // @ts-ignore
        let age = ageRef.current?.value
        // @ts-ignore
        let password = passwordRef.current?.value

        if (!email) return window.alert("Missing Email")
        if (!password) return window.alert("Missing Password")
        if (!age) return window.alert("Missing age")
        if (!name) return window.alert("Missing name")

        signUpFormOnSubmit({
            email: email,
            age: age,
            name: name,
            password: password,
        })
        event.preventDefault()
    }

    return (
        <>
            <div className="h-screen">
            {/*
                This example requires updating your template:

                ```
                <html class="h-full bg-white">
                <body class="h-full">
                ```
            */}
            <div className="flex min-h-full flex-1 flex-col pt-32 px-6 pb-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up for an account
                </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST" 
                // @ts-ignore
                onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                            ref={nameRef}
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                            ref={emailRef}
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                            </label>
                            <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                            ref={passwordRef}
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                            Age
                        </label>
                        <div className="mt-2">
                            <input
                            ref={ageRef}
                            id="age"
                            name="age"
                            type="number"
                            autoComplete="age"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign Up
                    </button>
                    </div>
                </form>

                <div className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link href="/login">
                        <p className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Log In    
                        </p>
                    </Link>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Home