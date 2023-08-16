import type { NextPage } from 'next'
import Layout from '../components/Layout'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { getPosts, getUsers } from '../lib/server'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const Home: NextPage = () => {

    let [users, setUsers] = useState<{[x: string]: any}[]>([])

    useEffect(() => {

        const f = async () => {

            let users = await getUsers()
            setUsers(users)
        }
        f()

    })

    return (
        <>
            <div className='h-screen grid place-items-center'>
                <div className='grid place-items-center bg-emerald-800 rounded-md px-32 py-16'>
                    {users.map(user => {

                        const {email, name, id, age} = user

                        return <><p className="text-2xl pb-4">{`
                        Id: ${id}
                        Email: ${email}
                        Name: ${name}
                        Age: ${age}
                        `}</p>
                        <Link href={`/u/${id}`}>
                        User Link
                        </Link></>
                    })}
                </div>

            </div>
        </>
    )
}

export default Home
