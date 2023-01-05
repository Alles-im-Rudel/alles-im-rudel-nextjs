import React from 'react';
import tw from "twin.macro";
import Image from "next/image";
import {TextLink} from "../Button";

const FooterWrapper = tw.div`
    bg-primary
    text-white
    flex
    flex-col
    w-full
    justify-center
    items-center
    py-10
    gap-4
`;

const ActionWrapper = tw.div`
    flex
    flex-col
    items-center
    gap-3
    md:flex-row
`;

const Footer = () => {
    return (
        <FooterWrapper>
            <Image
                src="/logos/logo-white-slim.png"
                alt="Logo Alles im Rudel e.V."
                width={120}
                height={64}
            />
            2022 - Alles im Rudel e.V.
            <ActionWrapper>
                <TextLink href="/legal-notice">
                    Impressum
                </TextLink>
                <TextLink href="/privacy-notice">
                    Datenschutzerkärung
                </TextLink>
                <TextLink href="/articles-of-association">
                    Satzung
                </TextLink>
            </ActionWrapper>
        </FooterWrapper>
    );
};

export default Footer;
