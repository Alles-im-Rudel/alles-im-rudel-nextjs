import React from 'react';
import Checkbox from "../../../Form/Checkbox";
import Headline from "../../../Layout/Headline";
import Text from "../../../Layout/Text";
import tw from "twin.macro";
import {iBackendBranche} from "../../../../Interfaces/iBranche";

const Card = tw.div`
    flex 
    gap-6
    items-center
`;

const Title = tw.div`
    flex
    flex-col
`;

interface iBranchSelect {
    branch: iBackendBranche
    control: unknown
}
const BranchSelect = ({branch, control}: iBranchSelect) => {
    return (
        <Card>
            <Checkbox
                name={branch.name}
                placeholder={branch.name}
                control={control}
                disabled={!branch.isSelectable}
                rules={{
                    required: false,
                }}
            />
            <Title>
                <Headline headline={5}>{branch.name}</Headline>
                <Text small>Vereinsbeitrag: {branch.price} € </Text>
            </Title>
        </Card>
    );
};

export default BranchSelect;
