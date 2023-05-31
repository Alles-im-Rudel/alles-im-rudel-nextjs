import React, { useState } from "react";
import { TextButton } from "../../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../../../../lib/Auth/store";
import { shallow } from "zustand/shallow";
import SyncUsersModal from "./SyncUsersModal";

interface iSyncUsersButton {
  userGroupId: number;
}
const SyncUsersButton = ({ userGroupId }: iSyncUsersButton) => {
  const [can] = useAuthStore((state) => [state.can], shallow);
  const [modalIsActive, setModalIsActive] = useState(false);

  return (
    <>
      {modalIsActive && (
        <SyncUsersModal
          isActive={modalIsActive}
          userGroupId={userGroupId}
          onClose={() => setModalIsActive(!modalIsActive)}
        />
      )}
      {can("user_groups.user.sync") && (
        <TextButton onClick={() => setModalIsActive(!modalIsActive)}>
          <FontAwesomeIcon icon={faUser} />
        </TextButton>
      )}
    </>
  );
};

export default SyncUsersButton;
