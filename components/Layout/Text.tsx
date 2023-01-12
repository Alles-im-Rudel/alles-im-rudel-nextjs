import React, { ReactNode } from 'react';
import tw from 'twin.macro';
import styled from "@emotion/styled";


type iTextElement = {
    small: boolean;
}
const TextElement = styled.p<iTextElement>`
  ${({small}) => small ? tw`text-small`: tw`text-text`}
`;

const Text = ({small = false, children, ...props}: { small?: boolean, children: ReactNode }) => {
    return (
        <TextElement small={small} {...props}>
            {children}
        </TextElement>
    );
};

export default Text;
