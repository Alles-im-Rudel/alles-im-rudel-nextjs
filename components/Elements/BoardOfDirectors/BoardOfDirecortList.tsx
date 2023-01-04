import React from 'react';
import tw from "twin.macro";
import iBoardOfDirecor from "../../../Interfaces/iBoardOfDirecor";
import BoardOfDirectorCard from "./BoardOfDirectorCard";

const ListWrapper = tw.div`
    flex
    gap-10
    m-20
`;

type BoardOfDirectorsProps = {
    boardOfDirectors: iBoardOfDirecor[]
}
const BoardOfDirectors = ({boardOfDirectors}: BoardOfDirectorsProps) => {
    return (
        <ListWrapper>
            {boardOfDirectors.map((item) => <BoardOfDirectorCard key={item.id} boardOfDirector={item} />)}
        </ListWrapper>
    );
};

export default BoardOfDirectors;
