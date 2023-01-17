import React from "react";
import tw from "twin.macro";
import iPost from "../../Interfaces/iPost";
import Head from "next/head";
import {apiFetch, Endpoint} from "../../lib/api";

const ContentWrapper = tw.div`
    bg-white
    flex
    flex-col
    justify-center
    items-center
`;

const Content = tw.div`
    max-w-screen-lg
    flex
    flex-col
    gap-5
`;

type PostProps = {
    post: iPost
}
export default function Post({post}: PostProps) {
    return (
        <>
            <Head>
                <title> {post.title} | Alles im Rudel e.V.</title>
            </Head>
            <ContentWrapper>
                <Content>
                    {post.title}
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
    return {props: {post: post.data}}
}
