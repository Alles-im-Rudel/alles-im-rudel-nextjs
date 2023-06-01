import React from "react";
import { TextButton } from "../../../Button";
import useAuthStore from "../../../../lib/Auth/store";
import { shallow } from "zustand/shallow";
import { Color } from "../../../Button/BackgroundColor";
import iUser from "../../../../Interfaces/iUser";
import useMembersStore from "../../../../lib/Management/Members/store";

interface iMemberRejectButton {
  user: iUser;
}
const MemberRejectButton = ({ user }: iMemberRejectButton) => {
  const [can] = useAuthStore((state) => [state.can], shallow);
  const [reject] = useMembersStore((state) => [state.reject], shallow);
  const rejectMember = () => {
    reject(user.id);
  };

  return (
    <>
      {can("members.manage.new") && (
        <TextButton onClick={rejectMember} color={Color.error}>
          Benutzer ablehnen
        </TextButton>
      )}
    </>
  );
};

export default MemberRejectButton;
