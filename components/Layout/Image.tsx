import React from "react";
import _image from "next/image";
import styled from "@emotion/styled";

interface iImage {
  loader: unknown;
}

const Image = styled(_image)<iImage>``;

interface iImageWithLoader {
  src: string;
  alt: string;
  width: number;
  height: number;
  props?: unknown;
  priority?: boolean;
}

const ImageWithLoader = ({
  src,
  alt,
  width,
  height,
  ...props
}: iImageWithLoader) => {
  // @ts-ignore
  const myLoader = ({ src }) => {
    return `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}${src}`;
  };

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
