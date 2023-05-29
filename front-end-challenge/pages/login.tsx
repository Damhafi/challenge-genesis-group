import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
    email: z
        .string()
        .email('Digite um e-mail válido')
        .nonempty('Campo obrigatório'),
    password: z.string().nonempty('Campo obrigatório')
})

type FormData = z.infer<typeof schema>

const Login: NextPage = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>()

    const onSubmit = handleSubmit(async data => {
        try {
            await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password
            })

            router.push('/')
        } catch (error) {
            // Lida com erros de autenticação
        }
    })

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>

            <section className="w-full dark:bg-gray-900 h-screen flex flex-col items-center justify-center space-y-8">
                <h1 className="text-3xl text-neutral-50 font-bold">Login</h1>
                <form className="w-72" onSubmit={onSubmit}>
                    <div>
                        <label
                            className="block mb-2 text-neutral-50"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            id="email"
                            {...register('email')}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>

                    <div>
                        <label
                            className="block mb-2 text-neutral-50"
                            htmlFor="password"
                        >
                            Senha
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            id="password"
                            {...register('password')}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <button
                        className="w-72 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="submit"
                        onClick={onSubmit}
                    >
                        Entrar
                    </button>
                </form>
            </section>
        </>
    )
}

// @ts-ignore
Login.noLayout = true

export default Login
