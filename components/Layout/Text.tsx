import React, { ReactNode } from 'react';
import tw from 'twin.macro';

const TextElement = tw.p`
    text-text
`

const Text = ({children}: { children: ReactNode }) => {
    return (
        <TextElement>
            {children}
        </TextElement>
    );
};

export default Text;
