import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
    render() {
        return (
            <Html lang="pt-br">
                <Head>
                    <meta
                        httpEquiv="Content-Type"
                        content="text/html; charset=utf-8"
                    />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="robots" content="index,follow" />
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="anonymous"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap"
                        rel="stylesheet"
                    ></link>
                </Head>
                <body className="min-h-screen h-full font-sans">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
