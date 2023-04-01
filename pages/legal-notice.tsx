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
`;

const HeadlineItemThree = tw(HeadlineItem)`
    pt-12
`;

const HeadlineItemFour = tw(HeadlineItem)`
    pt-12
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
                        <Markdown components={{
                            "h3": ({children}: any) => <HeadlineItemThree headline={3}>{children}</HeadlineItemThree>,
                            "h4": ({children}: any) => <HeadlineItemFour headline={4}>{children}</HeadlineItemFour>
                        }}>
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
