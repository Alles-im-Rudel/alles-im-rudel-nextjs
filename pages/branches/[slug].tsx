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
import {Link} from "../../components/Button";
import {apiFetch} from "../../lib/api";
import ImageWithLoader from "../../components/Layout/Image";
import LoLTeamList from "../../components/ESports/LoLTeamList";

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
    px-4
    lg:px-0
`;

const Image = tw(ImageWithLoader)`
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

const Headline = tw.h1`
    text-center
    text-headline-lg
    text-white
    uppercase
`;

const StickyWrapperRight = tw.div`
    lg:absolute
    top-32
    right-32
    z-20
    h-full
    mt-10
    lg:mt-0
`;

const StickyWrapperLeft = tw.div`
    hidden
    lg:block
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
    console.log(branch.attributes.lolTeams)
    return (
        <>
            <Head>
                <title> {branch.attributes.displayName} | Alles im Rudel e.V.</title>
                <meta
                    name="description"
                    content={branch.attributes.slug === "airsoft" ? "Wir sind eines der größten und am meisten organisierten Airsoft-Teams im Norden Deutschlands. Mit Mitgliedern aus dem Raum Schleswig-Holstein, Hamburg, Niedersachsen und Mecklenburg-Vorpommern. Mit breit aufgestellten, kompetenten, lokalen Ansprechpartnern." : "Wir sind ein E-Sports-Team, das sich an allen möglichen Spielen versucht und sind dabei stets auf der Suche nach weiteren Spielern, die sowohl freundlich als auch teamplayfähig sind. Zwar steht bei uns der Spaß im Vordergrund, aber je nach Spiel nehmen wir auch kompetitiv an kleineren oder auch mal größeren Turnieren teil. Aktuell spielt die Mehrheit von uns vor allem League of Legends, aber auch Spiele wie Minecraft oder Hearts of Iron sind bei uns vertreten."}
                />
            </Head>
            <Header>
                <Image
                    priority
                    src={branch.attributes.backgroundImage.data.attributes.url}
                    alt="Logo Alles im Rudel e.V."
                    width={1920}
                    height={1000}
                />
                <HeadlineWrapper>
                    <LogoImage
                        src="/logos/logo-white-slim.png"
                        alt="Logo Alles im Rudel e.V."
                        width={150}
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
                <Content>
                    <Markdown>
                        {branch.attributes.description}
                    </Markdown>
                </Content>
                <StickyWrapperRight>
                    <LeaderCard leader={branch.attributes.leader} />
                </StickyWrapperRight>
                {branch.attributes.airsoftTeam.length > 0 &&
                  <MemberList headline="Unser Team" memberList={branch.attributes.airsoftTeam} />}
                {branch.attributes.lolTeams.length > 0 &&
                  <LoLTeamList teams={branch.attributes.lolTeams} />}
                {branch?.attributes?.partners?.data && branch?.attributes?.partners?.data.length > 0 && <>
                  <Divider>
                    Unsere Partner
                  </Divider>
                  <PartnerList partners={branch.attributes.partners.data} />
                </>}
                {branch?.attributes?.gallery.data && branch?.attributes?.gallery.data.length > 0 && <>
                  <Divider>
                    Galerie
                  </Divider>
                  <Gallery gallery={branch.attributes.gallery.data} />
                </>}
            </ContentWrapper>
        </>
    )
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await apiFetch('/branches')
    const {data} = await res
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
    const responseBranche = await apiFetch(`/branches?filters[slug][$eq]=${params.slug}&populate[0]=*&populate[1]=backgroundImage.*&populate[2]=airsoftTeam.image&populate[3]=gallery.*&populate[4]=partners.logo&populate[5]=leader.image&populate[6]=airsoftTeam.playerBadges.image&populate[7]=lolTeams.*&populate[8]=lolTeams.teamMembers.lolLane&populate[9]=lolTeams.teamMembers.lolLane.image&populate[10]=lolTeams.teamMembers.image`);
    const branche = await responseBranche;

    return {
        props: {
            branch: branche.data[0],
        },
        revalidate: 30
    };
}

export default Branch
