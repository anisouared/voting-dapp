'use client'
import { useState } from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Link from 'next/link';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isConnected } = useAccount();

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo et liens de navigation desktop */}
                    <div className="flex flex-1">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-3xl font-bold" style={{ color: '#f45970' }}>
                                VOTING
                            </Link>
                        </div>

                        {/* Liens de navigation desktop - visible seulement si connecté */}
                        {isConnected && (
                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                <Link
                                    href="/"
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    Accueil
                                </Link>
                                <Link
                                    href="/administration"
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    Administration
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Status du vote - visible seulement si connecté */}
                    {isConnected && (
                        <div className="hidden md:flex items-center mr-6">
                            <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-md border border-gray-100">
                                <span className="text-sm">
                                    <span className="font-bold text-gray-800">Status :</span>{" "}
                                    <span className="font-semibold text-green-600">
                                        Proposals Registration Started
                                    </span>
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Bouton Connect et Menu Mobile */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <ConnectButton />
                        </div>

                        {/* Bouton menu mobile - visible seulement si connecté */}
                        {isConnected && (
                            <div className="flex items-center sm:hidden ml-4">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        {isOpen ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Menu mobile - visible seulement si connecté */}
            {isOpen && isConnected && (
                <div className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            href="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                            Accueil
                        </Link>
                        <Link
                            href="/administration"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                            Administration
                        </Link>
                        {/* Status dans le menu mobile */}
                        <div className="px-3 py-2 text-sm text-gray-700 flex items-center space-x-2 bg-gray-50 rounded-md mx-2">
                            <span>
                                <span className="font-bold text-gray-800">Status :</span>{" "}
                                <span className="font-semibold text-green-600">
                                    Proposals Registration Started
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;