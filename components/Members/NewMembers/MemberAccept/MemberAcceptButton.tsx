import React from "react";
import { TextButton } from "../../../Button";
import useAuthStore from "../../../../lib/Auth/store";
import { shallow } from "zustand/shallow";
import { Color } from "../../../Button/BackgroundColor";
import iUser from "../../../../Interfaces/iUser";
import useMembersStore from "../../../../lib/Management/Members/store";

interface iMemberAcceptButton {
  user: iUser;
}
const MemberAcceptButton = ({ user }: iMemberAcceptButton) => {
  const [can] = useAuthStore((state) => [state.can], shallow);
  const [accept] = useMembersStore((state) => [state.accept], shallow);

  const acceptMember = () => {
    accept(user.id);
  };

  return (
    <>
      {can("members.manage.new") && (
        <TextButton onClick={acceptMember} color={Color.success}>
          Benutzer Annehmen
        </TextButton>
      )}
    </>
  );
};

export default MemberAcceptButton;
