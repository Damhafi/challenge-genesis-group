/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
    interface User {
        name: string
        image: string
        accountType: string
    }

    interface Session {
        user: {
            name: string
            image: string
            accountType: string
        }
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        name: string
        image: string
        accountType: string
    }
}
