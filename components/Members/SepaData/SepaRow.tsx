import React from "react";
import iBranchUserMemberShip from "../../../Interfaces/iBranchUserMemberShip";
import { date } from "../../../lib/dates";
import tw from "twin.macro";
import SetExportedButton from "./SetExportedButton";

const BranchRow = tw.div`
  flex
  justify-between
  p-smallest
  border
`;

interface iSepaRow {
  branchUserMemberShips: iBranchUserMemberShip[];
  headerLength: number;
}
const SepaRow = ({ branchUserMemberShips, headerLength }: iSepaRow) => {
  const getColor = (branchUserMemberShip: iBranchUserMemberShip) => {
    if (branchUserMemberShip.state === "isMember") {
      return tw`bg-success`;
    }
    if (branchUserMemberShip.branchId === 1) {
      return tw`bg-error`;
    }
    return tw`bg-warning`;
  };

  return (
    <td colSpan={headerLength}>
      {branchUserMemberShips.map((branchUserMemberShip) => (
        <BranchRow
          key={branchUserMemberShip.id}
          css={getColor(branchUserMemberShip)}
        >
          <div>{branchUserMemberShip.branch.name}</div>
          <div>{branchUserMemberShip.branch.price}&nbsp;€</div>
          <div>{date(branchUserMemberShip.sepaDate)}</div>
          <SetExportedButton branchUserMemberShipId={branchUserMemberShip.id} />
        </BranchRow>
      ))}
    </td>
  );
};

export default SepaRow;
