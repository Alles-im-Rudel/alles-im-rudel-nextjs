import tw from "twin.macro";
import React from "react";
import Head from "next/head";
import {apiFetch} from "../lib/api";
import Markdown from "../components/Layout/Markdown";
import Divider from "../components/Elements/Divider";
import HeadlineItem from "../components/Layout/Headline";

const Container = tw.div`
    mb-20
`;

const ContentWrapper = tw.div`
    bg-white
    flex
    flex-col
    justify-center
    items-center
`;

const Content = tw.div`
    lg:max-w-screen-xl
    text-base
`;


const HeadlineItemThree = tw(HeadlineItem)`
    pt-12
`;

const HeadlineItemFour = tw(HeadlineItem)`
    pt-12
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
                        <Markdown components={{
                            "h3": ({children}: any) => <HeadlineItemThree headline={3}>{children}</HeadlineItemThree>,
                            "h4": ({children}: any) => <HeadlineItemFour headline={4}>{children}</HeadlineItemFour>
                        }}>
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
