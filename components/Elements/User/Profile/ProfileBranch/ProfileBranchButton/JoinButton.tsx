import React from "react";
import Button, { TextButton } from "../../../../../Button";
import { Color } from "../../../../../Button/BackgroundColor";
import { iBackendBranche } from "../../../../../../Interfaces/iBranche";
import useProfileStore from "../../../../../../lib/Profil/store";
import toast from "react-hot-toast";
import tw from "twin.macro";
import { shallow } from "zustand/shallow";

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

interface iJoinButton {
  branch: iBackendBranche;
  onReload: any;
}

const JoinButton = ({ branch, onReload }: iJoinButton) => {
  const [joinBranch] = useProfileStore((state) => [state.joinBranch], shallow);

  const handleConfirm = () => {
    toast(
      (t) => (
        <Toast>
          {branch.name} beitreten?
          <ToastText>
            Möchtest du der Sparte {branch.name} wirklich einen Beitrittsantrag
            schicken?
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
              color={Color.success}
              onClick={() => {
                joinBranch(branch, onReload);
                toast.dismiss(t.id);
              }}
            >
              Ja anfragen
            </TextButton>
          </ToastAction>
        </Toast>
      ),
      { id: "cancelBranch", duration: 10000 }
    );
  };

  return (
    <>
      <Button color={Color.success} onClick={handleConfirm}>
        Beitreten
      </Button>
    </>
  );
};

export default JoinButton;
