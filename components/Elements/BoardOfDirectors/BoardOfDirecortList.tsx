import React from 'react';
import tw from "twin.macro";
import iBoardOfDirecor from "../../../Interfaces/iBoardOfDirecor";
import BoardOfDirectorCard from "./BoardOfDirectorCard";

const ListWrapper = tw.div`
    max-w-screen-xl
    flex
    gap-small
    my-base
    mx-small
    flex-wrap
    justify-center
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
