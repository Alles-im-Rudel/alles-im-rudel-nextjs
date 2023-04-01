import tw, {GlobalStyles} from 'twin.macro'
import type {AppProps} from 'next/app'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import SocialFooter from "../components/Footer/SocialFooter";
import {config} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import "../styles/globals.css";

config.autoAddCss = false;

const Cotnainer = tw.div`
    mt-base
    text-text
`;

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <GlobalStyles />
            <Navigation />
            <Cotnainer>
                <Component {...pageProps} />
            </Cotnainer>
            <SocialFooter />
            <Footer />
        </>
    )
}
