import { BaseLayoutComponent } from 'components/layout/layout'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import React from 'react'
import Head from 'next/head'

type Props = AppProps & { Component: { noLayout?: boolean } }

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: Props) => {
    const LayoutComponent = Component.noLayout
        ? React.Fragment
        : BaseLayoutComponent

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SessionProvider session={session}>
                <LayoutComponent>
                    <Component {...pageProps} />
                </LayoutComponent>
            </SessionProvider>

            <ToastContainer />
        </>
    )
}

export default MyApp
