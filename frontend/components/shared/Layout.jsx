'use client'

import Header from "./Header"
import Footer from "./Footer"
import NotConnected from "@/components/shared/NotConnected"
import { useAccount } from "wagmi";

const Layout = ({ children }) => {
    const { isConnected } = useAccount();

    return (
        <div className="app">
            <Header />
            {isConnected ? (
                <main className="main">
                    {children}
                </main>
            ) : (
                <NotConnected />
            )}

            <Footer />
        </div>
    )
}

export default Layout