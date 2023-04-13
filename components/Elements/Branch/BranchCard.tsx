import React from "react";
import iBranchUserMemberShip from "../../../Interfaces/iBranchUserMemberShip";
import { Li, List } from "../../Layout/Ul";
import Card, { CardHeadline, CardText } from "../../Layout/Card";
import { dateTimeSek } from "../../../lib/dates";
import { showBoolean } from "../../../lib/boolean";

interface iBranchCard {
  branch: iBranchUserMemberShip;
}
const BranchCard = ({ branch }: iBranchCard) => {
  return (
    <Card>
      <CardHeadline>
        {branch.branch.name}
        <br />
        Status: {branch.state}
      </CardHeadline>
      <CardText>
        <List>
          <Li>Zugehörig seit: {dateTimeSek(branch.createdAt)}</Li>
          <Li>Zuletzt bearbeitet: {dateTimeSek(branch.updatedAt)}</Li>
          <Li>
            Möchte die Sparte verlassen {showBoolean(branch.wantsToLeave)}
          </Li>
        </List>
      </CardText>
    </Card>
  );
};

export default BranchCard;
