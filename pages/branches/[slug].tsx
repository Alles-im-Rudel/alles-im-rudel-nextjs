import tw from "twin.macro";
import React from "react";
import _image from "next/image";
import Head from "next/head";
import iBranche from "../../Interfaces/iBranche";
import Divider from "../../components/Elements/Divider";
import PartnerList from "../../components/Elements/Partner/PartnerList";
import LeaderCard from "../../components/Elements/LeaderCard";
import { Link } from "../../components/Button";
import { apiFetch, Endpoint } from "../../lib/api";
import ImageWithLoader from "../../components/Layout/Image";
import { css } from "@emotion/react";
import RichTextElement from "../../components/Layout/RichTextElement";

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
    mt-base
`;

const Content = tw.div`
    max-w-screen-xl
    px-small
    flex
    flex-col
    gap-small
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
    w-72
`;

const Headline = tw.h1`
    text-center
    text-headline
    text-white
    uppercase
`;

const StickyWrapperRight = tw.div`
    xl:absolute
    top-base
    right-[3rem]
    z-20
    h-full
    mt-base
    xl:mt-0
`;

const StickyWrapperLeft = tw.div`
    hidden
    lg:block
    absolute
    top-base
    left-base
    z-20
    h-full
`;

type BranchProps = {
  branch: iBranche;
};

function Branch({ branch }: BranchProps) {
  return (
    <>
      <Head>
        <title> {branch.displayName} | Alles im Rudel e.V.</title>
        <meta
          name="description"
          content={
            branch.slug === "airsoft"
              ? "Wir sind eines der größten und am meisten organisierten Airsoft-Teams im Norden Deutschlands. Mit Mitgliedern aus dem Raum Schleswig-Holstein, Hamburg, Niedersachsen und Mecklenburg-Vorpommern. Mit breit aufgestellten, kompetenten, lokalen Ansprechpartnern."
              : "Wir sind ein E-Sports-Team, das sich an allen möglichen Spielen versucht und sind dabei stets auf der Suche nach weiteren Spielern, die sowohl freundlich als auch teamplayfähig sind. Zwar steht bei uns der Spaß im Vordergrund, aber je nach Spiel nehmen wir auch kompetitiv an kleineren oder auch mal größeren Turnieren teil. Aktuell spielt die Mehrheit von uns vor allem League of Legends, aber auch Spiele wie Minecraft oder Hearts of Iron sind bei uns vertreten."
          }
        />
      </Head>
      <Header>
        <Image
          priority
          src={branch.image.url}
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
          <Headline>{branch.displayName}</Headline>
        </HeadlineWrapper>
      </Header>
      <ContentWrapper>
        <StickyWrapperLeft>
          <Link
            href="/join"
            css={css`
              ${tw`sticky top-base`}
            `}
          >
            Join now
          </Link>
        </StickyWrapperLeft>
        <Content>
          <RichTextElement>{branch.description}</RichTextElement>
        </Content>
        <StickyWrapperRight>
          <LeaderCard leader={branch.leader} />
        </StickyWrapperRight>
        {/*{branch.attributes.airsoftTeam.length > 0 &&
                  <MemberList headline="Unser Team" memberList={branch.attributes.airsoftTeam} />}
                {branch.attributes.lolTeams.length > 0 &&
                  <LoLTeamList teams={branch.attributes.lolTeams} />}*/}
        {branch?.partners?.length > 0 && (
          <>
            <Divider>Unsere Partner</Divider>
            <PartnerList partners={branch.partners} />
          </>
        )}
        {/*{branch?.attributes?.gallery.data &&
          branch?.attributes?.gallery.data.length > 0 && (
            <>
              <Divider>Galerie</Divider>
              <Gallery gallery={branch.attributes.gallery.data} />
            </>
          )}*/}
      </ContentWrapper>
    </>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await apiFetch("/branches", Endpoint.payloadCms);
  const { docs } = await res;
  // Get the paths we want to pre-render based on posts
  const paths = docs.map((branch: iBranche) => ({
    params: { slug: branch.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

type BranchParams = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: BranchParams) {
  const branche = await apiFetch(
    `/branches?where[slug][equals]=${params.slug}`,
    Endpoint.payloadCms
  );

  return {
    props: {
      branch: branche.docs[0],
    },
    revalidate: 30,
  };
}

export default Branch;
