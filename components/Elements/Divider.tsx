import React, {ReactElement} from 'react';
import tw from "twin.macro";
import Headline from '../Layout/Headline';

const Container = tw.div`
    w-full
    bg-greyBlue
    text-white
    text-center
    flex
    justify-center
    p-8
`;

interface DividerProps {
    children: string | ReactElement;
}

const Divider = ({children, ...props}: DividerProps) => {
    return (
        <Container {...props}>
            <Headline headline={3}>
                {children}
            </Headline>
        </Container>
    );
};

export default Divider;
