import React, { useState } from "react";
import { TextButton } from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../../../lib/Auth/store";
import { shallow } from "zustand/shallow";
import AcceptNewBranchMembersModal from "./AcceptNewBranchMembersModal";
import iUser from "../../../Interfaces/iUser";
import iBranchUserMemberShip from "../../../Interfaces/iBranchUserMemberShip";

interface iAcceptNewBranchMembersButton {
  user: iUser;
  branchUserMemberShip: iBranchUserMemberShip;
}
const AcceptNewBranchMembersButton = ({
  user,
  branchUserMemberShip,
}: iAcceptNewBranchMembersButton) => {
  const [can] = useAuthStore((state) => [state.can], shallow);
  const [modalIsActive, setModalIsActive] = useState(false);

  return (
    <>
      {modalIsActive && (
        <AcceptNewBranchMembersModal
          isActive={modalIsActive}
          user={user}
          branchUserMemberShip={branchUserMemberShip}
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

export default AcceptNewBranchMembersButton;
