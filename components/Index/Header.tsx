import React from "react";
import styled from "@emotion/styled";
import tw from "twin.macro";
import _image from "next/image";
import ImageWithLoader from "../Layout/Image";

const Container = styled.div`
  position: relative;
  z-index: 1;
  ${tw`
    mb-small  
  `}
`;

const Wrapper = tw.div`
  max-w-screen-xl
  mx-auto
  px-small
`;

const Headline = tw.h1`
  text-black
  text-h-4
  w-full
  py-small
  mb-smaller
`;

const Grid = tw.div`
  grid
  grid-rows-[repeat(4, minmax(200px, auto))]
  grid-cols-1
  md:grid-rows-[repeat(2, minmax(200px, auto))]
  md:grid-cols-12
  gap-smaller
`;

const Welcome = tw.div`
    md:col-span-7
    bg-primary
    text-textWhite
    text-base
    rounded-base
    rounded-tr-none
    p-base
    flex
    justify-end
    flex-col
`;

const Line = tw.div`
  mt-small
  w-12
  h-[1px]
  bg-white
  mb-smaller
`;

const ImageAirsoft = tw(ImageWithLoader)`
    md:col-span-5
    h-full
    object-cover
    rounded-larger
    rounded-tl-none
    rounded-br-none
    grayscale
    hover:grayscale-0
    cursor-pointer
`;

const ImageESports = tw(ImageWithLoader)`
    md:col-span-6
    h-full
    max-h-[16rem]
    object-cover
    rounded-base
    rounded-bl-none
    grayscale
    hover:grayscale-0
    cursor-pointer
`;

const ImageWrapper = tw.div`
    bg-primary
    md:col-span-6
    rounded-base
    rounded-tr-none
    flex
    justify-center
    max-h-[16rem]
    p-smallest
`;

const ImageLogo = tw(ImageWithLoader)`
    h-full
    object-contain
`;

const Subline = tw.b`
  ml-small
`;

const Header = ({ data }: any) => {
  return (
    <Container>
      <Wrapper>
        <Headline>
          {data.headline}
          <br /> <Subline>{data.subline}</Subline>
        </Headline>
        <Grid>
          <Welcome>
            <Line />
            {data.text}
          </Welcome>
          <ImageAirsoft
            priority
            src={data.imageRight.url}
            alt={data.imageRight.alt}
            width={500}
            height={500}
          />
          <ImageESports
            priority
            src={data.imageLeft.url}
            alt={data.imageRight.alt}
            width={600}
            height={300}
          />
          <ImageWrapper>
            <ImageLogo
              priority
              src={data.imageLogo.url}
              alt={data.imageRight.alt}
              width={500}
              height={300}
            />
          </ImageWrapper>
        </Grid>
      </Wrapper>
    </Container>
  );
};

export default Header;
