import React from "react";
import Head from "next/head";
import { apiFetch, Endpoint } from "../lib/api";
function Page({ page }: any) {
  return (
    <>
      <Head>
        <title> {page.meta.title} | Alles im Rudel e.V.</title>
        <meta name="description" content={page.meta.description} />
      </Head>
      <div>das ist der erste tgest</div>
    </>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await apiFetch("/pages", Endpoint.payloadCms);
  const { docs } = await res;
  // Get the paths we want to pre-render based on posts
  const paths = docs.map((page: any) => ({
    params: { slug: page.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

type iPageParams = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: iPageParams) {
  const response = await apiFetch(
    `/pages?where[slug][equals]=${params.slug}`,
    Endpoint.payloadCms
  );

  return {
    props: {
      page: response.docs[0],
    },
    revalidate: 30,
  };
}

export default Page;
