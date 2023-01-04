import React, {ReactNode} from 'react';
import tw from 'twin.macro';

const UnorderdList = tw.ul`
    list-disc
    list-inside
`;

const ListItem = tw.li`

`;

const Ul = ({children}: { children: ReactNode }) => {
    return (
        <UnorderdList>
            {children}
        </UnorderdList>
    );
};

export default Ul;

export const Li = ({children}: { children: ReactNode }) => {
    return (
        <ListItem>
            {children}
        </ListItem>
    );
};
