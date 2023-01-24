import tw from "twin.macro";
import React from "react";
import _image from "next/image";
import Divider from "../components/Elements/Divider";
import IPost from "../Interfaces/iPost";
import PostsPreviewList from "../components/Elements/Post/PostsPreviewList";
import Head from "next/head";
import BoardOfDirectorList from "../components/Elements/BoardOfDirectors/BoardOfDirecortList";
import iBoardOfDirecor from "../Interfaces/iBoardOfDirecor";
import iPartner from "../Interfaces/iPartner";
import PartnerList from "../components/Elements/Partner/PartnerList";
import iBranche from "../Interfaces/iBranche";
import BranchList from "../components/Elements/Branch/BranchList";
import {apiFetch, Endpoint} from "../lib/api";

const Container = tw.div`
    
`;

const Header = tw.div`
    relative
    h-[50vh]
    overflow-hidden
    flex
    justify-center
    items-center
`;

const Image = tw(_image)`
      absolute
      z-1
      mx-auto
      w-auto
      h-auto
      max-w-[90%]
      max-h-[90%]
`;

const BackgroundImage = tw(_image)`
    absolute
    w-full
    h-full
    z-0
    object-cover
`;

const ContentWrapper = tw.div`
    bg-white
    flex
    flex-col
    justify-center
    items-center
`;

const Content = tw.div`
    flex
    flex-col
    gap-5
    min-h-[50vh]
    px-4
    lg:px-0
    lg:max-w-screen-lg
`;

const Headline = tw.p`
    mt-5
    text-center
    text-h-3
    lg:mt-10
    lg:text-headline-lg
`;

const Text = tw.p`
    text-center
`;

type IndexProps = {
    posts: IPost[];
    boardOfDirectors: iBoardOfDirecor[]
    partners: iPartner[]
    branches: iBranche[]
}

function Index({posts, boardOfDirectors, partners, branches}: IndexProps) {
    return (
        <>
            <Head>
                <title>Alles im Rudel e.V.</title>
            </Head>
            <Container>
                <Header>
                    <BackgroundImage
                        src="/backgrounds/default.jpg"
                        alt="Hintergrund Alles im Rudel e.V."
                        width={1920}
                        height={1080}
                    />
                    <Image
                        src="/logos/logo-grey-slim.png"
                        alt="Logo Alles im Rudel e.V."
                        width={1000}
                        height={550}
                    />
                </Header>
                <ContentWrapper>
                    <Content>
                        <Headline>Willkommen</Headline>
                        <Text>bei Alles im Rudel e.V.</Text>
                        <Text>
                            Wir sind ein stetig wachsender Verein mit Sitz in Elmshorn, dessen Zweck es ist, sich für
                            den
                            Erhalt
                            & die Förderung der sozialen Einheit „Alles im Rudel“ einzusetzen, zu welcher insbesondere
                            unsere
                            Vereinsmitglieder gehören.
                            Dies geschieht vornehmlich durch einen regelmäßigen sozialen Austausch unserer
                            Vereinsmitglieder,
                            welcher grundsätzlich in den unterschiedlichsten Formen erfolgen kann.
                        </Text>
                        <Text>
                            Unter anderem geschieht dies auch in den verschiedenen Vereinssparten, welche nach Bedarf
                            von
                            unseren Vereinsmitgliedern ins Leben gerufen werden können, um so dediziert spezielle
                            Interessen
                            abzubilden.
                        </Text>
                    </Content>
                    <Divider title="News" />
                    <PostsPreviewList posts={posts} />
                    <Divider title="Der Vorstand" />
                    <BoardOfDirectorList boardOfDirectors={boardOfDirectors} />
                    <Divider title="Unsere Partner" />
                    <PartnerList partners={partners} />
                    <Divider title="Unsere Sparten" />
                    <BranchList branches={branches} />
                </ContentWrapper>
            </Container>
        </>
    )
}

export async function getStaticProps() {
    const response = await apiFetch("/posts?page=1&perPage=3", Endpoint.backend);
    const posts = await response;

    const responseBoardOfDirectors = await apiFetch("/board-of-directors?populate=image");
    const boardOfDirectors = await responseBoardOfDirectors;

    const responseParners = await apiFetch("/partners?populate=logo");
    const partners = await responseParners;

    const responseBranches = await apiFetch("/branches?populate=image");
    const branches = await responseBranches;

    return {
        props: {
            posts: posts.data,
            boardOfDirectors: boardOfDirectors.data,
            partners: partners.data,
            branches: branches.data,
        },
        revalidate: 30,
    };
}

export default Index
