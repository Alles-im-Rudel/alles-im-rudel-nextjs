import React from "react";
import tw from "twin.macro";
import IBoardMember from "../../../Interfaces/iBoardMember";
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
  boardOfDirectors: IBoardMember[];
};
const BoardOfDirectors = ({ boardOfDirectors }: BoardOfDirectorsProps) => {
  return (
    <ListWrapper>
      {boardOfDirectors.map((item) => (
        <BoardOfDirectorCard key={item.id} boardOfDirector={item} />
      ))}
    </ListWrapper>
  );
};

export default BoardOfDirectors;
