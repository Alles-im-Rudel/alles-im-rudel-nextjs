import React, { useState } from "react";
import { TextButton } from "../../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../../../../lib/Auth/store";
import { shallow } from "zustand/shallow";
import ShowUserModal from "./ShowUserModal";

interface iShowUserButton {
  userId: number;
}
const ShowUserButton = ({ userId }: iShowUserButton) => {
  const [can] = useAuthStore((state) => [state.can], shallow);
  const [modalIsActive, setModalIsActive] = useState(false);

  return (
    <>
      {modalIsActive && (
        <ShowUserModal
          isActive={modalIsActive}
          userId={userId}
          onClose={() => setModalIsActive(!modalIsActive)}
        />
      )}
      {can("users.show") && (
        <TextButton onClick={() => setModalIsActive(!modalIsActive)}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </TextButton>
      )}
    </>
  );
};

export default ShowUserButton;
