import {
    NextComponentType,
    NextPageContext,
    NextLayoutComponentType
} from 'next'
import type { AppProps } from 'next/app'

declare module 'next' {
    type NextLayoutComponentType<P = {}> = NextComponentType<
        NextPageContext,
        any,
        P
    > & {
        config?: {
            disableLayout?: boolean
        }
    }
}

declare module 'next/app' {
    type AppLayoutProps<P = {}> = AppProps & {
        Component: NextLayoutComponentType
    }
}
