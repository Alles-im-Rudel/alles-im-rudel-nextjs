import React from "react";
import tw from "twin.macro";
import iBoardMember from "../../../Interfaces/iBoardMember";
import ImageWithLoader from "../../Layout/Image";

const Chip = tw.div`
    rounded-full
    bg-secondary
    flex
    overflow-hidden
    w-fit
    items-center
`;

const Image = tw(ImageWithLoader)`
   object-cover
   rounded-full
   h-7
   w-7
`;

const Title = tw.div`
    px-smaller
    text-black
    text-small
`;

interface iUserChip {
  user: iBoardMember;
  css?: unknown;
}
const UserChip = ({ user, ...props }: iUserChip) => {
  return (
    <Chip {...props}>
      {typeof user.image !== "string" && user.image.url && (
        <Image src={user.image.url} alt="test" width={50} height={50} />
      )}
      <Title>{user.name}</Title>
    </Chip>
  );
};

export default UserChip;
