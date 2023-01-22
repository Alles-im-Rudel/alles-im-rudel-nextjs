import React from 'react';
import tw from "twin.macro";
import _image from "next/image";
import styled from "@emotion/styled";

interface iImage {
    loader: unknown
}

const Image = styled(_image)<iImage>``;

interface iImageWithLoader {
    src: string;
    alt: string;
    width: number;
    height: number;
    props?: unknown;
}

const ImageWithLoader = ({src, alt, width, height, ...props}: iImageWithLoader) => {
    // @ts-ignore
    const myLoader = ({src, width, quality}) => {
        return `${process.env.NEXT_PUBLIC_CONTENT_URL}/${src}?w=${width}&q=${quality || 75}`
    }

    return (
        <Image
            /* @ts-ignore */
            loader={myLoader}
            src={src}
            alt={alt}
            width={width}
            height={height}
            {...props}
        />
    );
};

export default ImageWithLoader;
