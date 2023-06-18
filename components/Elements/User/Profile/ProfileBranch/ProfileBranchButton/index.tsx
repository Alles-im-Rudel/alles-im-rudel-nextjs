import React from "react";
import JoinButton from "./JoinButton";
import LeaveButton from "./LeaveButton";
import iBranchUserMemberShip from "../../../../../../Interfaces/iBranchUserMemberShip";
import { iBackendBranche } from "../../../../../../Interfaces/iBranche";
import CancelLeaveButton from "./CancelLeaveButton";
import CancelJoinButton from "./CancelJoinButton";

interface iProfileBranchButton {
  branchUserMemberShip?: iBranchUserMemberShip;
  branch: iBackendBranche;
  onReload: any;
}
const ProfileBranchButton = ({
  branchUserMemberShip,
  branch,
  onReload,
}: iProfileBranchButton) => {
  return (
    <>
      {!branchUserMemberShip && (
        <JoinButton branch={branch} onReload={onReload} />
      )}
      {branchUserMemberShip && !branchUserMemberShip.isActive && (
        <CancelJoinButton
          branch={branch}
          branchUserMemberShip={branchUserMemberShip}
          onReload={onReload}
        />
      )}
      {branchUserMemberShip &&
        branchUserMemberShip.isActive &&
        !branchUserMemberShip.wantsToLeave && (
          <LeaveButton
            branch={branch}
            branchUserMemberShip={branchUserMemberShip}
            onReload={onReload}
          />
        )}
      {branchUserMemberShip && branchUserMemberShip.wantsToLeave && (
        <CancelLeaveButton
          branch={branch}
          branchUserMemberShip={branchUserMemberShip}
          onReload={onReload}
        />
      )}
    </>
  );
};

export default ProfileBranchButton;
