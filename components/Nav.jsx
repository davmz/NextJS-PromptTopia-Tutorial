"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    const isUserLoggedIn = true;

    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const setProvider = async () => {
            const response = await getProviders();
            setProviders(response);
        };

        setProvider();
    }, []);

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link
                href="/"
                className="flex gap-2 flex-center"
            >
                <Image
                    width={30}
                    height={30}
                    alt="Promptopia Logo"
                    className="object-contain"
                    src="/assets/images/logo.svg"
                />

                <p className="logo_text">Promptopia</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link
                            className="black_btn"
                            href="/create-prompt"
                        >
                            Create Post
                        </Link>

                        <button
                            type="button"
                            onClick={signOut}
                            className="outline_btn"
                        >
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <Image
                                width={37}
                                height={37}
                                alt="Profile"
                                className="rounded-full"
                                src="/assets/images/logo.svg"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers && 
                          Object.values(providers.map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                className="black_btn"
                                onClick={() => {signIn(provider.id)}}
                            >
                                Sign In
                            </button>
                          )))
                        }
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {isUserLoggedIn ? (
                    <div className="flex">
                        <Image
                            width={37}
                            height={37}
                            alt="Profile"
                            onClick={() => {}}
                            className="rounded-full"
                            src="/assets/images/logo.svg"
                        />
                    </div>
                ) : (
                    <>
                        {providers && 
                          Object.values(providers.map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                className="black_btn"
                                onClick={() => signIn(provider.id)}
                            >
                                Sign In
                            </button>
                          )))
                        }
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;