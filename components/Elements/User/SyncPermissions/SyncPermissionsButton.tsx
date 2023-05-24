import React, { useState } from "react";
import { TextButton } from "../../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../../../../lib/Auth/store";
import { shallow } from "zustand/shallow";
import SyncPermissionsModal from "./SyncPermissionsModal";

interface iSyncPermissionsButton {
  userId: number;
}
const SyncPermissionsButton = ({ userId }: iSyncPermissionsButton) => {
  const [can] = useAuthStore((state) => [state.can], shallow);
  const [modalIsActive, setModalIsActive] = useState(false);

  return (
    <>
      {modalIsActive && (
        <SyncPermissionsModal
          isActive={modalIsActive}
          userId={userId}
          onClose={() => setModalIsActive(!modalIsActive)}
        />
      )}
      {can("permissions.user.sync") && (
        <TextButton onClick={() => setModalIsActive(!modalIsActive)}>
          <FontAwesomeIcon icon={faLink} />
        </TextButton>
      )}
    </>
  );
};

export default SyncPermissionsButton;
