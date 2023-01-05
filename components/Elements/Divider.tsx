import React from 'react';
import tw from "twin.macro";
import Headline from '../Layout/Headline';

const Container = tw.div`
    w-full
    bg-greyBlue
    text-white
    text-center
    p-3
`;

type DividerProps = {
    title: string
}

const Divider = ({title}: DividerProps) => {
    return (
        <Container>
            <Headline headline={3}>
                {title}
            </Headline>
        </Container>
    );
};

export default Divider;
