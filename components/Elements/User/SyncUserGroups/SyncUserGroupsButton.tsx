import React, { useState } from "react";
import { TextButton } from "../../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../../../../lib/Auth/store";
import { shallow } from "zustand/shallow";
import SyncUserGroupsModal from "./SyncUserGroupsModal";

interface iSyncUserGroupsButton {
  userId: number;
}
const SyncUserGroupsButton = ({ userId }: iSyncUserGroupsButton) => {
  const [can] = useAuthStore((state) => [state.can], shallow);
  const [modalIsActive, setModalIsActive] = useState(false);

  return (
    <>
      {modalIsActive && (
        <SyncUserGroupsModal
          isActive={modalIsActive}
          userId={userId}
          onClose={() => setModalIsActive(!modalIsActive)}
        />
      )}
      {can("user_groups.user.sync") && (
        <TextButton onClick={() => setModalIsActive(!modalIsActive)}>
          <FontAwesomeIcon icon={faUsers} />
        </TextButton>
      )}
    </>
  );
};

export default SyncUserGroupsButton;
