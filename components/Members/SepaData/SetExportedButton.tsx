import React from "react";
import { TextButton } from "../../Button";
import { Color } from "../../Button/BackgroundColor";
import useSepaDataStore from "../../../lib/Management/SepaData/store";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shallow } from "zustand/shallow";

interface iSetExportedButton {
  branchUserMemberShipId: number;
}

const SetExportedButton = ({ branchUserMemberShipId }: iSetExportedButton) => {
  const [SetSepaDataExported] = useSepaDataStore(
    (state) => [state.SetSepaDataExported],
    shallow
  );

  return (
    <TextButton
      color={Color.primary}
      onClick={() => SetSepaDataExported(branchUserMemberShipId)}
    >
      <FontAwesomeIcon icon={faCheck} />
    </TextButton>
  );
};

export default SetExportedButton;
