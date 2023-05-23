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

                    console.log(res.data)

                    // const dCoded = JWT.verify(res.data.token, 'hJ#1$89nka!pQl2M#3$5@R')
                    // if (typeof dCoded !== 'object'){
                    //     return null
                    // }

                    return {
                        name: res.data.user.name,
                        email: res.data.user.email,
                        userId: res.data.user.id,
                        accountType: res.data.user.accountType,
                        image: res.data.user.image,
                    }
                } catch (e) {
                    console.log(e)
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && account.type === 'credentials' && user) {
                token.accessToken = user.accessToken
            }

            token.accountType = user?.accountType

            return token
        },
        async session({ session, token }) {
            if (token && token.accessToken) {
                session.accessToken = token.accessToken
            }

            session.accountType = token?.accountType

            return session
        }
    },
    jwt: {
        secret: 'hJ#1$89nka!pQl2M#3$5@R'
    },
    pages: {
        signIn: '/auth/signin'
    }
})

// if (credentials === undefined)
//     throw new Error('Empty credentials')

// return {
//     name: credentials.email,
//     email: credentials.email,
// }
