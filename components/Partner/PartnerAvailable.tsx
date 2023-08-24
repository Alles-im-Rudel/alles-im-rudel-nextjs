import React from "react";
import iPartner from "../../Interfaces/iPartner";
import iBranchUserMemberShip from "../../Interfaces/iBranchUserMemberShip";
import tw from "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { css } from "@emotion/react";

const Text = tw.div`
  flex
  items-center
  gap-smallest
  text-base
`;

export const isAvailable = (
  branchUserMemberShips: iBranchUserMemberShip[],
  partner: iPartner
) => {
  if (partner.attributes.branches.data.length === 0) {
    return true;
  }
  if (
    partner.attributes.branches.data.some((partner) =>
      branchUserMemberShips.some(
        (branchUserMemberShip) =>
          branchUserMemberShip.branch.name === partner.attributes.slug
      )
    )
  ) {
    return true;
  }
  return false;
};

interface PartnerAvailableProps {
  partner: iPartner;
  branchUserMemberShips: iBranchUserMemberShip[];
}
const PartnerAvailable = ({
  partner,
  branchUserMemberShips,
}: PartnerAvailableProps) => {
  return (
    <Text>
      {isAvailable(branchUserMemberShips, partner) ? (
        <>
          <FontAwesomeIcon
            icon={faCheck}
            // @ts-ignore
            css={css`
              ${tw`text-success`}
            `}
          />
          Dieser Sponsor ist für dich verfügbar!
        </>
      ) : (
        <>
          <FontAwesomeIcon
            icon={faTimes}
            // @ts-ignore
            css={css`
              ${tw`text-error`}
            `}
          />
          Dieser Sponsor ist nur für{" "}
          {partner.attributes.branches.data
            .map((branch) => branch.attributes.displayName)
            .join(" / ")}{" "}
          verfügbar!
        </>
      )}
    </Text>
  );
};

export default PartnerAvailable;
