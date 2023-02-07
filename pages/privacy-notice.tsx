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

type privacyNoticeProps = {
    privacyNotice: any;
}

function PrivacyNotice({privacyNotice}: privacyNoticeProps) {
    return (
        <>
            <Head>
                <title>Datenschutzerklärung | Alles im Rudel e.V.</title>
                <meta
                    name="description"
                    content="Die Datenschutzerklärung von Alles im Rudel e.V."
                />
            </Head>
            <Container>
                <ContentWrapper>
                    <Divider>
                        Datenschutzerklärung
                    </Divider>
                    <Content>
                        <Markdown>
                            {privacyNotice.attributes.text}
                        </Markdown>
                    </Content>
                </ContentWrapper>
            </Container>
        </>
    )
}

export async function getStaticProps() {
    const responsePrivacyNotice = await apiFetch("/datenschutzerklaerungs/1");
    const privacyNotice = await responsePrivacyNotice;

    return {
        props: {
            privacyNotice: privacyNotice.data,
        },
        revalidate: 30,
    };
}

export default PrivacyNotice
