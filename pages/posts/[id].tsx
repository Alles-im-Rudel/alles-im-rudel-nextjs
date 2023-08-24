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
import UserChip from "../../components/Elements/User/UserChip";
import Text from "../../components/Layout/Text";
import { dateTime } from "../../lib/dates";
import ImageWithLoader from "../../components/Layout/Image";
import _image from "next/image";
import ReactMarkdown from "react-markdown";

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

type PostProps = {
  post: iPost;
};
export default function Post({ post }: PostProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.attributes.title,
    image: post.attributes.images.data[0].image,
    datePublished: post.attributes.createdAt,
    dateModified: post.attributes.updatedAt,
    author: [
      {
        "@type": "Person",
        name: post.attributes.board_of_director.data.attributes.name,
      },
    ],
  };

  return (
    <>
      <Head>
        <title> {post.attributes.title} | Alles im Rudel e.V.</title>
        <meta name="description" content={post.attributes.title} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <ContentWrapper>
        <Divider>
          <DividerWrapper>
            {post.attributes.title}
            <TagChip color={post.attributes.tag.color} css={tw`max-w-fit`}>
              {post.attributes.tag.tag}
            </TagChip>
          </DividerWrapper>
        </Divider>
        <Content>
          <ActionRow>
            <TextLink href="/">
              {/*@ts-ignore*/}
              <FontAwesomeIcon icon={faArrowLeft} css={tw`mr-2`} />
              Zurück
            </TextLink>
            {/*<UserChip user={post.attributes.board_of_director} />*/}
            <Text>{dateTime(post.attributes.createdAt)}</Text>
          </ActionRow>
          <Image
            src={post.attributes.images.data[0].attributes.url}
            width={1000}
            height={1000}
            alt={post.attributes.title}
          />
          <ReactMarkdown>{post.attributes.text}</ReactMarkdown>
        </Content>
      </ContentWrapper>
    </>
  );
}

export async function getStaticPaths() {
  const res = await apiFetch("/posts");
  const { data } = await res;
  const paths = data.map((post: iPost) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
}

type PostParams = {
  params: {
    id: number;
  };
};

export async function getStaticProps({ params }: PostParams) {
  const res = await apiFetch(
    `/posts/${params.id}?populate=images,board_of_director,tag`
  );
  const post = await res;
  return { props: { post: post.data }, revalidate: 30 };
}
