import React from 'react';
import tw from "twin.macro";
import iBoardOfDirecor from "../../../Interfaces/iBoardOfDirecor";
import BoardOfDirectorCard from "./BoardOfDirectorCard";

const ListWrapper = tw.div`
    flex
    gap-10
    my-20
    mx-1
    flex-col
    md:m-20
    md:flex-row
    lg:max-w-screen-lg
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
