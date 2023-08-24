import React from "react";
import tw from "twin.macro";
import iPartner from "../../Interfaces/iPartner";
import iUser from "../../Interfaces/iUser";
import Card from "../Layout/Card";
import Expandable from "../Layout/Expandable";
import ImageWithLoader from "../Layout/Image";
import PartnerAvailable, { isAvailable } from "./PartnerAvailable";
import Markdown from "../Layout/Markdown";
import { css } from "@emotion/react";

const Header = tw.div`
  flex
  gap-small
  items-center
`;

const Image = tw(ImageWithLoader)`
   object-contain
   h-[8rem]
   w-[8rem]
`;

const TextWrapper = tw.div`
  flex
  flex-col
`;

const Summery = tw.div`
  flex
  flex-col
  gap-smaller
`;

const Headline = tw.p`

`;

interface iPartnerCardProps {
  partner: iPartner;
  user: iUser;
}
const PartnerCard = ({ partner, user }: iPartnerCardProps) => {
  console.log(partner);
  return (
    <Card>
      <Expandable>
        <Expandable.Header>
          <Header>
            <Image
              src={
                partner.attributes.smallLogo.data
                  ? partner.attributes.smallLogo.data.attributes.url
                  : partner.attributes.logo.data.attributes.url
              }
              alt="test"
              width={400}
              height={250}
            />
            <TextWrapper>
              <div>{partner.attributes.name}</div>
              <PartnerAvailable
                partner={partner}
                branchUserMemberShips={user.branchUserMemberShips}
              />
            </TextWrapper>
          </Header>
        </Expandable.Header>
        <Expandable.Body>
          <Summery>
            <div>
              <Headline>Welche Vorteile hab ich?</Headline>
              <Markdown
                css={css`
                  ${tw`text-base`}
                `}
              >
                {partner.attributes.benefits}
              </Markdown>
            </div>
            {isAvailable(user.branchUserMemberShips, partner) && (
              <div>
                <Headline>Wie komme ich an die Vorteile?</Headline>
                <Markdown
                  css={css`
                    p {
                      ${tw`text-base`}
                    }
                    ${tw`text-base`}
                  `}
                >
                  {partner.attributes.howToGet}
                </Markdown>
              </div>
            )}
          </Summery>
        </Expandable.Body>
      </Expandable>
    </Card>
  );
};

export default PartnerCard;
