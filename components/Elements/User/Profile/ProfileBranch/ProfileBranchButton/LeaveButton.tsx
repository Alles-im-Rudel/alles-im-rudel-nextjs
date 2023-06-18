import React from "react";
import { iBackendBranche } from "../../../../../../Interfaces/iBranche";
import iBranchUserMemberShip from "../../../../../../Interfaces/iBranchUserMemberShip";
import Button, { TextButton } from "../../../../../Button";
import { Color } from "../../../../../Button/BackgroundColor";
import useProfilStore from "../../../../../../lib/Profil/store";
import { shallow } from "zustand/shallow";
import toast from "react-hot-toast";
import tw from "twin.macro";

const Toast = tw.div`
  flex
  flex-col
`;

const ToastText = tw.div`
  text-small
`;

const ToastAction = tw.div`
  w-full
  flex
  justify-between
`;

interface iLeaveButton {
  branch: iBackendBranche;
  branchUserMemberShip: iBranchUserMemberShip;
  onReload: any;
}

const LeaveButton = ({
  branch,
  branchUserMemberShip,
  onReload,
}: iLeaveButton) => {
  const [loading, leaveBranch] = useProfilStore(
    (state) => [state.branchIsLoading, state.leaveBranch],
    shallow
  );

  const handleConfirm = () => {
    toast(
      (t) => (
        <Toast>
          {branchUserMemberShip.branch.name} verlassen?
          <ToastText>
            Möchtest du {branchUserMemberShip.branch.name} wirklich verlassen?
          </ToastText>
          <ToastAction>
            <TextButton
              onClick={() => {
                toast.dismiss(t.id);
              }}
            >
              abbrechen
            </TextButton>
            <TextButton
              color={Color.error}
              onClick={() => {
                leaveBranch(branchUserMemberShip, onReload);
                toast.dismiss(t.id);
              }}
            >
              verlassen
            </TextButton>
          </ToastAction>
        </Toast>
      ),
      { id: "leaveBranch", duration: 10000 }
    );
  };

  return (
    <Button
      type="button"
      color={Color.error}
      isLoading={loading}
      onClick={handleConfirm}
    >
      {branch.id === 1 ? "Verein " : "Sparte "}Verlassen
    </Button>
  );
};

export default LeaveButton;
