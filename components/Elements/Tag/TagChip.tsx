import styled from '@emotion/styled';
import React from 'react';
import tw from "twin.macro";

type ChipProps = {
    color: string
}
const Chip = styled.div<ChipProps>`
  background-color: ${({color}) => color};
  ${tw`
     flex
     justify-center
     items-center
     text-white
     text-small
     rounded-full
     px-3
     py-1
     h-fit
  `}
`;

interface TagChipProps {
    children: string;
    color: string;
    css?: unknown;
}
const TagChip = ({color, children, ...props}: TagChipProps) => {
    return (
        <Chip color={color} {...props}>
            {children}
        </Chip>
    );
};

export default TagChip;
