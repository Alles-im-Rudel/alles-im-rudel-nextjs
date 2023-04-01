import React from "react";
import tw from "twin.macro";
import iPost from "../../Interfaces/iPost";
import Head from "next/head";
import {apiFetch, Endpoint} from "../../lib/api";
import Divider from "../../components/Elements/Divider";
import TagChip from "../../components/Elements/Tag/TagChip";
import {TextLink} from "../../components/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import UserChip from "../../components/Elements/User/UserChip";
import Text from "../../components/Layout/Text";
import {dateTime} from "../../lib/dates";
import ImageWithLoader from "../../components/Layout/Image";
import _image from "next/image";

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

const Image = tw(_image)`
   object-cover
   h-full
   w-full
`;

type PostProps = {
    post: iPost
}
export default function Post({post}: PostProps) {

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": post.title,
        "image": post.image.image,
        "datePublished": post.createdAt,
        "dateModified": post.updatedAt,
        "author": [{
            "@type": "Person",
            "name": post.user.fullName,
        }]
    };

    return (
        <>
            <Head>
                <title> {post.title} | Alles im Rudel e.V.</title>
                <meta
                    name="description"
                    content={post.title}
                />
                <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}} />
            </Head>
            <ContentWrapper>
                <Divider>
                    <DividerWrapper>
                        {post.title}
                        <TagChip color={post.tag.color} css={tw`max-w-fit`}>
                            {post.tag.name}
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
                        <UserChip user={post.user} />
                        <Text>{dateTime(post.createdAt)}</Text>
                    </ActionRow>
                    <Image src={post.image.image} width={1000} height={1000} alt={post.title} />
                    {/*@ts-ignore*/}
                    <div dangerouslySetInnerHTML={{__html: post.text}} css={tw`text-text`} />
                </Content>
            </ContentWrapper>
        </>
    )
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await apiFetch('/posts?page=1&perPage=100', Endpoint.backend)
    const {data} = await res
    // Get the paths we want to pre-render based on posts
    const paths = data.map((post: iPost) => ({
        params: {id: post.id.toString()},
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {paths, fallback: false}
}

type PostParams = {
    params: {
        id: number
    }
}

// This also gets called at build time
export async function getStaticProps({params}: PostParams) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await apiFetch(`/posts/${params.id}`, Endpoint.backend)
    const post = await res

    // Pass post data to the page via props
    return {props: {post: post.data}, revalidate: 30}
}
