import tw from "twin.macro";
import React from "react";
import Head from "next/head";
import {apiFetch} from "../lib/api";
import Markdown from "../components/Layout/Markdown";
import Divider from "../components/Elements/Divider";

const Container = tw.div`
    
`;

const ContentWrapper = tw.div`
    bg-white
    flex
    flex-col
    justify-center
    items-center
`;

const Content = tw.div`
    lg:max-w-screen-lg
`;

type LegalNoticeProps = {
    legalNotice: any;
}

function LegalNotice({legalNotice}: LegalNoticeProps) {
    return (
        <>
            <Head>
                <title>Impressum | Alles im Rudel e.V.</title>
                <meta
                    name="description"
                    content="Das Impressum von Alles im Rudel e.V."
                />
            </Head>
            <Container>
                <ContentWrapper>
                    <Divider>
                        Impressum
                    </Divider>
                    <Content>
                        <Markdown>
                            {legalNotice.attributes.text}
                        </Markdown>
                    </Content>
                </ContentWrapper>
            </Container>
        </>
    )
}

export async function getStaticProps() {
    const responseLegalNotice = await apiFetch("/impressums/1");
    const legalNotice = await responseLegalNotice;

    return {
        props: {
            legalNotice: legalNotice.data,
        },
        revalidate: 30,
    };
}

export default LegalNotice
