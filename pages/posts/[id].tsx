import React from "react";
import tw from "twin.macro";
import iPost from "../../Interfaces/iPost";
import Head from "next/head";
import { apiFetch, Endpoint } from "../../lib/api";
import Divider from "../../components/Elements/Divider";
import TagChip from "../../components/Elements/Tag/TagChip";
import { TextLink } from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Text from "../../components/Layout/Text";
import { dateTime } from "../../lib/dates";
import ImageWithLoader from "../../components/Layout/Image";
import { css } from "@emotion/react";
import UserChip from "../../components/Elements/User/UserChip";
import RichTextElement from "../../components/Layout/RichTextElement";
import iTag from "../../Interfaces/iTag";

const ContentWrapper = tw.div`
    bg-white
    flex
    flex-col
    justify-center
    items-center
`;

const Content = tw.div`
    px-small
    py-small
    max-w-screen-xl
    flex
    flex-col
    gap-small
`;

const DividerWrapper = tw.div`
    flex
    flex-col
    gap-smaller
    justify-center
    items-center
`;

const ActionRow = tw.div`
    flex
    flex-row
    flex-wrap
    justify-between
    items-center
`;

const Image = tw(ImageWithLoader)`
   object-cover
   h-full
   w-full
`;

interface PostProps {
  post: iPost;
}
export default function Post({ post }: PostProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    image: post.image.url,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: [
      {
        "@type": "Person",
        name: post.author.name,
      },
    ],
  };

  return (
    <>
      <Head>
        <title> {post.title} | Alles im Rudel e.V.</title>
        <meta name="description" content={post.title} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <ContentWrapper>
        <Divider>
          <DividerWrapper>
            {post.title}
            <TagChip
              color={post.tag.color}
              css={css`
                ${tw`max-w-fit`}
              `}
            >
              {post.tag.name}
            </TagChip>
          </DividerWrapper>
        </Divider>
        <Content>
          <ActionRow>
            <TextLink href="/">
              <FontAwesomeIcon
                icon={faArrowLeft}
                // @ts-ignore
                css={css`
                  ${tw`mr-2`}
                `}
              />
              Zurück
            </TextLink>
            <UserChip user={post.author} />
            <Text>{dateTime(post.createdAt)}</Text>
          </ActionRow>
          {post.image.url && (
            <Image
              src={post.image.url}
              width={1000}
              height={1000}
              alt={post.title}
            />
          )}
          <RichTextElement>{post.text}</RichTextElement>
        </Content>
      </ContentWrapper>
    </>
  );
}

export async function getStaticPaths() {
  const res = await apiFetch("/posts?locale=en", Endpoint.payloadCms);
  const { docs } = await res;

  const paths = docs.map((post: iPost) => ({
    params: { id: post.id },
  }));

  return { paths, fallback: false };
}

type PostParams = {
  params: {
    id: number;
  };
};

export async function getStaticProps({ params }: PostParams) {
  const response = await apiFetch(
    `/posts/?where[id][equals]=${params.id}`,
    Endpoint.payloadCms
  );

  return { props: { post: response.docs[0] }, revalidate: 30 };
}
