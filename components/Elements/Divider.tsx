import React from 'react';
import tw from "twin.macro";

const Container = tw.div`
    w-full
    bg-greyBlue
    text-headline
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
            {title}
        </Container>
    );
};

export default Divider;
