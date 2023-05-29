import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { api } from 'src/services/api'
import ReactModal from 'react-modal'

interface Orcament {
    orcamentId: number
    productName: string
    price: number
    status: string
}

const Home: NextPage = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [orcaments, setOrcaments] = useState([] as Orcament[])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [orcamentoId, setOrcamentoId] = useState(0)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }

        const fetchOrcaments = async () => {
            try {
                const response = await api.get('/orcamentos').then(res => {
                    setOrcaments(res.data)
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchOrcaments()
    }, [])

    useEffect(() => {}, [])

    const handleOpenModal = (id: number) => {
        if (id === 0) return

        setOrcamentoId(id)
    }



    if (status === 'unauthenticated') {
        router.push('/login')
    }

    return (
        <>
            <section className="w-full h-screen flex flex-col items-center justify-center space-y-8">
                <Head>
                    <title>Orcamentos</title>
                    <meta name="description" content="Orcamentos" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div className="bg-gray-100 w-full py-6 h-screen">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    Orçamentos
                                </h1>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                    // onClick={() => router.push('/orcamentos/create')}
                                    // enviar para a page orcamentos/[id]
                                    onClick={() =>
                                        router.push({
                                            pathname: `/orcamento/${0}`
                                        })
                                    }
                                >
                                    Add Orçamento
                                </button>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        Orçamento Nº ID
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Produto
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Preço Total
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Altenate Status
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                                    >
                                                        <span className="sr-only ">
                                                            Edit
                                                        </span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {orcaments.map(
                                                    (orcaments: Orcament) => (
                                                        <tr
                                                            key={
                                                                orcaments.orcamentId
                                                            }
                                                        >
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                {
                                                                    orcaments.orcamentId
                                                                }
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                {
                                                                    orcaments.productName
                                                                }
                                                            </td>

                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                {
                                                                    orcaments.status
                                                                }
                                                            </td>

                                                            {/* alternate status */}
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                {orcaments.status ===
                                                                    'Pendente' ||
                                                                    (orcaments.status ===
                                                                        'Aguardando' && (
                                                                        <button
                                                                            type="button"
                                                                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                                                            onClick={() =>
                                                                                handleOpenModal(
                                                                                    orcaments.orcamentId
                                                                                )
                                                                            }
                                                                        >
                                                                            Alterar
                                                                            Status
                                                                        </button>
                                                                    ))}
                                                            </td>

                                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                                <a
                                                                    href="#"
                                                                    className="text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    Edit
                                                                    <span className="sr-only">
                                                                        ,{' '}
                                                                        {
                                                                            orcaments.productName
                                                                        }
                                                                    </span>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
            >
                <button>
                    Deletar Orçamento
                </button>
            </ReactModal>
        </>
    )
}

export default Home
