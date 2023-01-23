import React from 'react';
import tw from "twin.macro";
import iPlayerBadges from "../../Interfaces/iPlayerBadges";
import styled from "@emotion/styled";
import ImageWithLoader from "../Layout/Image";

const Container = styled.div`
  ${tw`
    w-[20px]
    h-[20px]
    flex
  `};

  &:hover > div {
    visibility: visible;
  }
;
`;

const Tooltip = tw.div`
    absolute 
    bg-darkGrey
    invisible
    p-2
    text-base
    text-white 
    rounded-md
    m-4
    mt-6
    mx-auto
    left-1/2 
    -translate-x-1/2 
    opacity-80
    w-max
`;

const Image = tw(ImageWithLoader)`
   object-cover
   h-full
   w-full
`;

type iBadge = {
    badge: iPlayerBadges
};

const Badge = ({badge}: iBadge) => {
    return (
        <Container>
            <Image
                src={badge.attributes.image.data.attributes.url}
                alt="test"
                width={20}
                height={20}
            />
            <Tooltip>
                {badge.attributes.name}
            </Tooltip>
        </Container>
    );
};

export default Badge;
