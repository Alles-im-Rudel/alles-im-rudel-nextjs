import React from 'react';
import tw from "twin.macro";
import Headline from '../Layout/Headline';

const Container = tw.div`
    w-full
    bg-greyBlue
    text-white
    text-center
    p-8
`;

interface DividerProps {
    title: string;
}

const Divider = ({title, ...props}: DividerProps) => {
    return (
        <Container {...props}>
            <Headline headline={3}>
                {title}
            </Headline>
        </Container>
    );
};

export default Divider;
