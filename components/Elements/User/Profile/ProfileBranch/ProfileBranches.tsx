import React, { useEffect, useMemo } from "react";
import iUser from "../../../../../Interfaces/iUser";
import useBranchStore from "../../../../../lib/Branch/store";
import { shallow } from "zustand/shallow";
import ProfileBranchCard from "./ProfileBranchCard";
import tw from "twin.macro";

const BranchWrapper = tw.div`
  flex
  flex-col
  gap-smaller
`;

const TextWrapper = tw.div`

`;

const Strong = tw.span`
    font-bold
`;

interface iProfileBranches {
  user: iUser;
  onReload: any;
}
const ProfileBranches = ({ user, onReload }: iProfileBranches) => {
  const [branches, getBranches] = useBranchStore(
    (state) => [state.branches, state.getBranches],
    shallow
  );

  useEffect(() => {
    getBranches();
  }, []);

  const currentCost = useMemo(() => {
    return user.branchUserMemberShips.reduce((acc, branchUserMemberShip) => {
      if (branchUserMemberShip.state === "isMember") {
        acc += branchUserMemberShip.branch.price;
      }
      return acc;
    }, 0);
  }, [user]);

  return (
    <>
      <BranchWrapper>
        {branches.map((branch) => (
          <ProfileBranchCard
            key={branch.id}
            branch={branch}
            branchUserMemberShip={user.branchUserMemberShips.find(
              (branchUserMemberShip) =>
                branchUserMemberShip.branchId === branch.id
            )}
            onReload={onReload}
          />
        ))}
        <TextWrapper>
          Aktuelle monatliche Beiträge: <Strong>{currentCost} €</Strong>
        </TextWrapper>
      </BranchWrapper>
    </>
  );
};

export default ProfileBranches;
