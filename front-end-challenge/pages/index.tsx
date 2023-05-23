import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import Article from 'components/home/article'

import { FaFolder } from 'react-icons/fa'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(() => {
        console.log(session, "sessssion")
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [])

    if (status === 'unauthenticated') {
        router.push('/login')
    }

    return (
        <section className="container h-screen flex flex-col items-center justify-center space-y-8">
            <Head>
                <title>My Design Pattern</title>
            </Head>

            <div className="grid grid-cols-3 gap-4">
                <Article
                    title="Components"
                    icon={<FaFolder />}
                    link="/components/"
                />
            </div>
        </section>
    )
}

export default Home
