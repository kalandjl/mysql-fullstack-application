import type { NextPage } from 'next'
import Layout from '../components/Layout'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { getPosts } from '../lib/server'

const Home: NextPage = () => {
    return (
        <>
            <div className='h-screen grid place-items-center'>
                <div className='grid place-items-center bg-emerald-800 rounded-md px-32 py-16'>
                    <h1
                    className='bold text-white text-9xl'
                    //@ts-ignore
                    onClick={getPosts}
                    >
                        BLOG
                    </h1>
                </div>

            </div>
        </>
    )
}

export default Home
