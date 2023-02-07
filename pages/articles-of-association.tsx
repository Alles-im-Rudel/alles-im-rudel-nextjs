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

type ArticelsOfAssociationProps = {
    articelsOfAssociation: any;
}

function ArticelsOfAssociation({articelsOfAssociation}: ArticelsOfAssociationProps) {
    return (
        <>
            <Head>
                <title>Vereinssatzung | Alles im Rudel e.V.</title>
                <meta
                    name="description"
                    content="Das Impressum von Alles im Rudel e.V."
                />
            </Head>
            <Container>
                <ContentWrapper>
                    <Divider>
                        Vereinssatzung
                    </Divider>
                    <Content>
                        <Markdown>
                            {articelsOfAssociation.attributes.text}
                        </Markdown>
                    </Content>
                </ContentWrapper>
            </Container>
        </>
    )
}

export async function getStaticProps() {
    const responseArticelsOfAssociation = await apiFetch("/vereinssatzungs/1");
    const articelsOfAssociation = await responseArticelsOfAssociation;

    return {
        props: {
            articelsOfAssociation: articelsOfAssociation.data,
        },
        revalidate: 30,
    };
}

export default ArticelsOfAssociation
