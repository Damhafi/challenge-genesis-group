import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { api } from 'src/services/api'
import JWT from 'jsonwebtoken'

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'E-mail'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                if (credentials === undefined)
                    throw new Error('Empty credentials')

                try {
                    const res = await api.post('/login', {
                        email: credentials.email,
                        password: credentials.password
                    })



                    return res.data.user

                } catch (e) {

                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && account.type === 'credentials' && user) {
                token.name = user.name
                token.image = user.image
                token.accountType = user.accountType
            }

            return token
        },
        // SESSAO
        async session({ session, token }) {
            if (token) {
                session.user.name = token.name
                session.user.image = token.image
                session.user.accountType = token.accountType
            }

            return session
        }
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60,
    },
    pages: {
        signIn: '/auth/signin',
    }
})
