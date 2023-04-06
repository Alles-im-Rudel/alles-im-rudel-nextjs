import tw, {GlobalStyles} from 'twin.macro'
import type {AppProps} from 'next/app'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import SocialFooter from "../components/Footer/SocialFooter";
import {config} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import "../styles/globals.css";
import React, {StrictMode, useEffect, useState} from "react";
import useAuthStore from "../lib/Auth/store";
import {shallow} from "zustand/shallow";
import {useRouter} from "next/router";

config.autoAddCss = false;

const Container = tw.div`
    mt-base
    text-text
`;

const RootLayout = ({children}: any) => {
    return (
        <>
            <GlobalStyles />
            <Navigation />
            <Container>
                {children}
            </Container>
            <SocialFooter />
            <Footer />
        </>
    )
}

export default function App({Component, pageProps}: AppProps) {
    const [isLocalAuth, setIsLocalAuth] = useState(false);
    const router = useRouter();

    const [
        isAuth,
        getAuth,
        can,
    ] = useAuthStore((state) => [
        state.isAuth,
        state.getAuth,
        state.can,
    ], shallow);

    useEffect(() => {
        if (!getAuth()) {
            router.push('/');
        }
    }, []);

    useEffect(() => {
        setIsLocalAuth(isAuth)
    }, [isAuth]);

    if (pageProps.protected && isLocalAuth && !isAuth && (pageProps.permission && !can(pageProps.permission))) {
        return (
            <RootLayout>
                <div>Loading...</div>
            </RootLayout>
        )
    }

    return (
        <RootLayout>
            <Component {...pageProps} />
        </RootLayout>
    )
}
