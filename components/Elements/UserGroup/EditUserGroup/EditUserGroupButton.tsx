import React, { useState } from "react";
import { TextButton } from "../../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../../../../lib/Auth/store";
import { shallow } from "zustand/shallow";
import EditUserGroupModal from "./EditUserGroupModal";
import iUserGroup from "../../../../Interfaces/iUserGroup";

interface iSyncPermissionsButton {
  userGroup: iUserGroup;
}
const SyncPermissionsButton = ({ userGroup }: iSyncPermissionsButton) => {
  const [can] = useAuthStore((state) => [state.can], shallow);
  const [modalIsActive, setModalIsActive] = useState(false);

  return (
    <>
      {modalIsActive && (
        <EditUserGroupModal
          isActive={modalIsActive}
          userGroup={userGroup}
          onClose={() => setModalIsActive(!modalIsActive)}
        />
      )}
      {can("user_groups.update") && (
        <TextButton onClick={() => setModalIsActive(!modalIsActive)}>
          <FontAwesomeIcon icon={faEdit} />
        </TextButton>
      )}
    </>
  );
};

export default SyncPermissionsButton;
