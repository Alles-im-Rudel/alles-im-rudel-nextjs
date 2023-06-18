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

interface iCancelJoinButton {
  branch: iBackendBranche;
  branchUserMemberShip: iBranchUserMemberShip;
  onReload: any;
}

const CancelJoinButton = ({
  branch,
  branchUserMemberShip,
  onReload,
}: iCancelJoinButton) => {
  const [loading, cancelBranch] = useProfilStore(
    (state) => [state.branchIsLoading, state.cancelBranch],
    shallow
  );

  const handleConfirm = () => {
    toast(
      (t) => (
        <Toast>
          {branchUserMemberShip.branch.name} doch nicht beitreten?
          <ToastText>
            Möchtest du {branchUserMemberShip.branch.name} wirklich nicht
            beitreten?
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
                cancelBranch(branchUserMemberShip, onReload);
                toast.dismiss(t.id);
              }}
            >
              Nicht beitreten
            </TextButton>
          </ToastAction>
        </Toast>
      ),
      { id: "cancelBranch", duration: 10000 }
    );
  };

  return (
    <Button
      type="button"
      color={Color.primary}
      isLoading={loading}
      onClick={handleConfirm}
    >
      {branch.id === 1 ? "Verein " : "Sparte "} doch nicht beitreten
    </Button>
  );
};

export default CancelJoinButton;
