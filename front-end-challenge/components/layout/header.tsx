import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const navigation = [{ name: 'Orçamentos', href: '/orcamentos' }]

const Header = (props: Props) => {
    const { data: session, status } = useSession()

    console.log(session)

    return (
        <header className="bg-indigo-600 w-full">
            <nav
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                aria-label="Top"
            >
                <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
                    <div className="flex items-center">
                        <Link href="/">
                            <a>
                                <span className="sr-only">Workflow</span>
                                <img
                                    className="h-10 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                                    alt=""
                                />
                            </a>
                        </Link>

                        <div className="hidden ml-10 space-x-8 lg:block">
                            {navigation.map(link => (
                                <Link href={link.href} key={link.name}>
                                    <a className="text-base font-medium text-white hover:text-indigo-50">
                                        {link.name}
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="ml-10 space-x-4">
                        {status === 'authenticated' && (
                            <a
                                href="#"
                                className="bg-white py-2 px-4 border border-transparent rounded-md
                                text-base font-medium text-indigo-600 hover:bg-indigo-50
                                flex items-center space-x-2 gap-2"
                            >
                                {session?.user?.name}

                                <Image
                                    src={session?.user?.image!}
                                    alt={session?.user?.name!}
                                    width={30}
                                    height={30}
                                    className="rounded-full"
                                />
                            </a>
                        )}
                    </div>
                </div>

                <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
                    {navigation.map(link => (
                        <Link href={link.href} key={link.name} passHref>
                            <a
                                rel="noreferrer"
                                className="text-base font-medium text-white hover:text-indigo-50"
                            >
                                {link.name}
                            </a>
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    )
}

export default Header
