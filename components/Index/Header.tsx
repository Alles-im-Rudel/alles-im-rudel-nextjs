import React from "react";
import styled from "@emotion/styled";
import tw from "twin.macro";
import _image from "next/image";

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
  text-primary
  text-h-4
  w-full
  py-small
  mb-smaller
`;

const Grid = tw.div`
  grid
  grid-rows-2
  grid-cols-12
  gap-smaller
`;

const Welcome = tw.div`
    col-span-7
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

const ImageAirsoft = tw(_image)`
    col-span-5
    h-full
    object-cover
    rounded-larger
    rounded-tl-none
    rounded-br-none
    grayscale
    hover:grayscale-0
    cursor-pointer
`;

const ImageESports = tw(_image)`
    col-span-6
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
    col-span-6
    rounded-base
    rounded-tr-none
    flex
    justify-center
    max-h-[16rem]
`;

const ImageLogo = tw(_image)`
    h-full
    object-contain
`;

const Subline = tw.b`
  ml-small
`;

const Header = ({}) => {
  return (
    <Container>
      <Wrapper>
        <Headline>
          Tauche ein in die fesselnde Welt von Alles im Rudel e.V.
          <br /> <Subline>Airsoft und E-Sports in Perfektion!</Subline>
        </Headline>
        <Grid>
          <Welcome>
            <Line />
            Willkommen bei Alles im Rudel, deinem ultimativen Airsoft- und
            E-Sports-Verein, der dich begeistern wird! Unsere dynamischen
            Veranstaltungen, erfahrenen Teamleiter und großartigen Sponsoren
            ermöglichen es dir, in die fesselnde Welt des Airsoft einzutauchen
            und spannende Missionen zu erleben, die deine Adrenalinspiegel in
            die Höhe treiben.
          </Welcome>
          <ImageAirsoft
            priority
            src="/header/airsoft.jpg"
            alt="Airsoft Player"
            width={500}
            height={500}
          />
          <ImageESports
            priority
            src="/header/esports.jpg"
            alt="Airsoft Player"
            width={600}
            height={300}
          />
          <ImageWrapper>
            <ImageLogo
              priority
              src="/logos/logo-white-slim.png"
              alt="Airsoft Player"
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
