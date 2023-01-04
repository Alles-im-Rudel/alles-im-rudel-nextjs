import tw from "twin.macro";
import React from "react";
import _image from "next/image";
import Head from "next/head";
import iBranche from "../../Interfaces/iBranche";
import Markdown from "../../components/Layout/Markdown";
import MemberList from "../../components/Airsoft/MemberList";
import Divider from "../../components/Elements/Divider";
import PartnerList from "../../components/Elements/Partner/PartnerList";
import Gallery from "../../components/Elements/Gallery";
import LeaderCard from "../../components/Elements/LeaderCard";
import { Link } from "../../components/Button";

const Header = tw.div`
    relative
    flex
    justify-center
    h-[60vh]
`;

const ContentWrapper = tw.div`
    relative
    bg-white
    flex
    flex-col
    justify-center
    items-center
    mt-10
`;

const Content = tw.div`
    max-w-screen-lg
    flex
    flex-col
    gap-5
`;

const Image = tw(_image)`
   object-cover
   h-full
   w-full
`;

const HeadlineWrapper = tw.div`
    absolute
    h-full
    flex
    flex-col
    justify-center
    items-center
`;

const LogoImage = tw(_image)`
    w-[150px]
`;

const Headline = tw.p`
    text-center
    text-headline
    text-white
    uppercase
`;

const StickyWrapperRight = tw.div`
    absolute
    top-32
    right-32
    z-20
    h-full
`;

const StickyWrapperLeft = tw.div`
    absolute
    top-32
    left-32
    z-20
    h-full
`;

type BranchProps = {
    branch: iBranche;
}
function Branch({branch}: BranchProps) {
    console.log(branch)
    return (
        <>
            <Head>
                <title> {branch.attributes.displayName} | Alles im Rudel e.V.</title>
            </Head>
            <Header>
                <Image
                    src={"http://localhost:1337" + branch.attributes.backgroundImage.data.attributes.url}
                    alt="Logo Alles im Rudel e.V."
                    width={1920}
                    height={1000}
                />
                <HeadlineWrapper>
                    <LogoImage
                        src="/logos/logo-white-slim.png"
                        alt="Logo Alles im Rudel e.V."
                        width={100}
                        height={100}
                    />
                    <Headline>
                        {branch.attributes.displayName}
                    </Headline>
                </HeadlineWrapper>
            </Header>
            <ContentWrapper>
                <StickyWrapperLeft>
                    <Link href="/join" css={tw`sticky top-32`}>
                        Join now
                    </Link>
                </StickyWrapperLeft>
                <StickyWrapperRight>
                    <LeaderCard leader={branch.attributes.leader} />
                </StickyWrapperRight>
                <Content>
                    {/*@ts-ignore*/}
                    <Markdown>
                        {branch.attributes.description}
                    </Markdown>
                    {branch.attributes.airsoftTeam.length > 0 &&
                      <MemberList headline="Unser Team" memberList={branch.attributes.airsoftTeam} />}
                </Content>
                {branch?.attributes?.partners?.data && branch?.attributes?.partners?.data.length > 0 && <>
                  <Divider title="Unsere Partner" />
                  <PartnerList partners={branch.attributes.partners.data} />
                </>}
                {branch?.attributes?.gallery.data && branch?.attributes?.gallery.data.length > 0 && <>
                  <Divider title="Galerie" />
                  <Gallery gallery={branch.attributes.gallery.data} />
                </>}
            </ContentWrapper>
        </>
    )
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('http://localhost:1337/api/branches')
    const {data} = await res.json()
    // Get the paths we want to pre-render based on posts
    const paths = data.map((branch: iBranche) => ({
        params: {slug: branch.attributes.slug},
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {paths, fallback: false}
}

type BranchParams = {
    params: {
        slug: string
    }
}

export async function getStaticProps({params}: BranchParams) {
    const responseBranche = await fetch(`http://localhost:1337/api/branches?filters[slug][$eq]=${params.slug}&populate[0]=*&populate[1]=backgroundImage.*&populate[2]=airsoftTeam.image&populate[3]=gallery.*&populate[4]=partners.logo&populate[5]=leader.image&populate[6]=airsoftTeam.playerBadges.image`);
    const branche = await responseBranche.json();

    return {
        props: {
            branch: branche.data[0],
        },
    };
}

export default Branch
