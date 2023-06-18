import React from "react";
import tw from "twin.macro";
import { iBackendBranche } from "../../../../../Interfaces/iBranche";
import iUser from "../../../../../Interfaces/iUser";
import iBranchUserMemberShip from "../../../../../Interfaces/iBranchUserMemberShip";
import ProfileBranchButton from "./ProfileBranchButton";

const Card = tw.div`
  border
  shadow-md
  p-smaller
  flex
  justify-between
  items-center
`;

const TextWrapper = tw.div`
  flex
  flex-col
`;

const Price = tw.div`
  text-small
`;

interface iProfileBranchCard {
  branch: iBackendBranche;
  branchUserMemberShip?: iBranchUserMemberShip;
  onReload: any;
}

const ProfileBranchCard = ({
  branch,
  branchUserMemberShip,
  onReload,
}: iProfileBranchCard) => {
  return (
    <Card>
      <TextWrapper>
        {branch.name}
        <Price>
          {branch.id === 1 ? "Vereinsbeitrag" : "Spartenbeitrag"}:{" "}
          {branch.price} €
        </Price>
      </TextWrapper>
      <ProfileBranchButton
        branchUserMemberShip={branchUserMemberShip}
        branch={branch}
        onReload={onReload}
      />
    </Card>
  );
};

export default ProfileBranchCard;
