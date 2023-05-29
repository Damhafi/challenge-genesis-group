import { NextPage } from 'next'
import { useRouter } from 'next/router'

const CadastroOrcamentos: NextPage = () => {
    const router = useRouter()

    return (
        <section className="bg-gray-100 w-full px-4 sm:px-6 lg:px-8 py-9">
            {/* create back page */}
            <div className="flex justify-start mb-8">
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 shadow-sm text-sm font-medium text-gray-200 hover:bg-gray-50 hover:text-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={() => router.back()}
                >
                    Back
                </button>
            </div>

            <div className="w-full">
                <form className="space-y-8 divide-y divide-gray-200">
                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div>
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Orçamento de Informática
                                </h3>
                            </div>
                        </div>

                        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Produtos
                                </h3>
                            </div>
                            <div className="space-y-6 sm:space-y-5">
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <label
                                            htmlFor="country"
                                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                        >
                                            Produto
                                        </label>

                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option className="text-gray-500">
                                                Mouse
                                            </option>
                                            <option className="text-gray-500">
                                                Teclado
                                            </option>
                                            <option className="text-gray-500">
                                                Headset
                                            </option>
                                        </select>
                                    </div>

                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <label
                                            htmlFor="country"
                                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                        >
                                            Cotação Fornecedor 1
                                        </label>

                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option className="text-gray-500">
                                                United States
                                            </option>
                                            <option className="text-gray-500">
                                                Canada
                                            </option>
                                            <option className="text-gray-500">
                                                Mexico
                                            </option>
                                        </select>
                                    </div>

                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <label
                                            htmlFor="country"
                                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                        >
                                            Cotação Fornecedor 2
                                        </label>

                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option className="text-gray-500">
                                                United States
                                            </option>
                                            <option className="text-gray-500">
                                                Canada
                                            </option>
                                            <option className="text-gray-500">
                                                Mexico
                                            </option>
                                        </select>
                                    </div>

                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <label
                                            htmlFor="country"
                                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                        >
                                            Cotação Forncedor 3
                                        </label>

                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option className="text-gray-500">
                                                United States
                                            </option>
                                            <option className="text-gray-500">
                                                Canada
                                            </option>
                                            <option className="text-gray-500">
                                                Mexico
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default CadastroOrcamentos
