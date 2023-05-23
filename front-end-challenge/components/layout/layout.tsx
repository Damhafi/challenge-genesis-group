import Footer from './footer'
import Header from './header'
import { FC } from "react";

type Props = {
    children?: React.ReactNode
}
export const BaseLayoutComponent: FC<Props> = (props) => {
    return (
        <div className="w-full min-h-screen h-full flex flex-col items-center bg-slate-600 text-white">
            <Header />
            <main className="w-full h-full flex-grow flex flex-col items-center">
                {props.children}
            </main>
            <Footer />
        </div>
    )
}
