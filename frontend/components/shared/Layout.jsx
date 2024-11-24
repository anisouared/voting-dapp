'use client'

import Header from "./Header"
import Footer from "./Footer"
import NotAuthorized from "@/components/shared/NotAuthorized"
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
                <NotAuthorized />
            )}

            <Footer />
        </div>
    )
}

export default Layout