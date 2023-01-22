import tw, {GlobalStyles} from 'twin.macro'
import type {AppProps} from 'next/app'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import SocialFooter from "../components/Footer/SocialFooter";
import {config} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import styled from "@emotion/styled";

config.autoAddCss = false;

const Cotnainer = styled.div`
  * {
    box-sizing: border-box;
  }

  ${tw`
    mt-16
    text-text
  `}
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
