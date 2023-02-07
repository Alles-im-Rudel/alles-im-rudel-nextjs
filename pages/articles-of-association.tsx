import tw from "twin.macro";
import React from "react";
import Head from "next/head";
import {apiFetch} from "../lib/api";
import Markdown from "../components/Layout/Markdown";
import Divider from "../components/Elements/Divider";
import styled from "@emotion/styled";
import HeadlineItem from "../components/Layout/Headline";

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
    text-base
`;

const ImgWrapper = tw.div`
   w-full
   flex
   justify-center
`;

const StyledImg = tw.img`
    w-[30%]
    h-auto  
`;

const Ol = tw.ol`
    list-outside
`;

const Li = styled.li`
  @counter-style counterBracket {
    system: numeric;
    symbols: "0" "1" "2" "3" "4" "5" "6" "7" "8" "9";
    prefix: "(";
    suffix: ")   ";
  }

  list-style-type: counterBracket;
`;

const HeadlineItemFour = tw(HeadlineItem)`
    text-center
    pt-8
    pb-5
`;

const HeadlineItemFive = tw(HeadlineItem)`
    text-center
    pt-12
    pb-12
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
                    content="Die Vereinssatzung von Alles im Rudel e.V."
                />
            </Head>
            <Container>
                <ContentWrapper>
                    <Divider>
                        Vereinssatzung
                    </Divider>
                    <Content>
                        <Markdown components={{
                            img: ({...props}) => <ImgWrapper><StyledImg {...props} /></ImgWrapper>,
                            ol: Ol,
                            li: Li,
                            "h4": ({children}: any) => <HeadlineItemFour headline={4}>{children}</HeadlineItemFour>,
                            "h5": ({children}: any) => <HeadlineItemFive headline={5}>{children}</HeadlineItemFive>
                        }}>
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
