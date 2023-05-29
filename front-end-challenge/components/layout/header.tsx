import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {}

const navigation = [{ name: 'Orçamentos', href: '/' }]

const Header = (props: Props) => {
    const { data: session, status } = useSession()
    const [openOptionsLogin, setOpenOptionsLogin] = useState(false)

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

                    {status === 'authenticated' && (
                        <div className="ml-10 space-x-4">
                            <a
                                href="#"
                                className="bg-white py-2 px-4 border border-transparent rounded-md
                                text-base font-medium text-indigo-600 hover:bg-indigo-50
                                flex items-center space-x-2 gap-2"
                                // onclick para abir o modal de opções
                                onClick={() => setOpenOptionsLogin(true)}
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
                        </div>
                    )}
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

            {openOptionsLogin ? (
                // modal para logout
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                            onClick={() => signOut()}
                                        >
                                            Logout
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                            onClick={() =>
                                                setOpenOptionsLogin(false)
                                            }
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </header>
    )
}

export default Header
