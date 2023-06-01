import React, { useState } from "react";
import { TextButton } from "../../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../../../../lib/Auth/store";
import { shallow } from "zustand/shallow";
import ShowUserModal from "../../../Elements/User/ShowUser/ShowUserModal";

interface iMemberShowButton {
  member: any;
}
const MemberShowButton = ({ member }: iMemberShowButton) => {
  const [can] = useAuthStore((state) => [state.can], shallow);
  const [modalIsActive, setModalIsActive] = useState(false);

  return (
    <>
      {modalIsActive && (
        <ShowUserModal
          isActive={modalIsActive}
          userId={member.id}
          isNewUser
          onClose={() => setModalIsActive(!modalIsActive)}
        />
      )}
      {can("members.manage.new") && (
        <TextButton onClick={() => setModalIsActive(!modalIsActive)}>
          <FontAwesomeIcon icon={faCheck} />
        </TextButton>
      )}
    </>
  );
};

export default MemberShowButton;
