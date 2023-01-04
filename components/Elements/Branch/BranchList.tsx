import React from 'react';
import tw from 'twin.macro';
import iBranche from "../../../Interfaces/iBranche";
import Branch from "./Branch";

const List = tw.div`
    w-full
`;

type BranchListProps = {
    branches: iBranche[]
}

const BranchList = ({branches}: BranchListProps) => {
    return (
        <List>
            {branches.map((item) => <Branch key={item.id} branch={item} />)}
        </List>
    );
};

export default BranchList;
