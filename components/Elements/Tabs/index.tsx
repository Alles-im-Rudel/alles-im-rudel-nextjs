import React, { ReactElement, useEffect, useState } from "react";
import tw from "twin.macro";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";

const TabContainer = tw.div`
   text-center
   border-b 
   border-secondary
`;

const TabLinkItems = tw.ul`
  flex
  flex-wrap
  justify-center
  gap-smaller
`;

interface iTabLinkItem {
  active: boolean;
}
const TabLinkItem = styled.li<iTabLinkItem>`
  ${tw`
    p-smallest
    text-secondary
    hover:text-black
  `}
  ${({ active }) =>
    active
      ? tw`
          border-b-2
          border-primary
          text-black
        `
      : tw``}
`;

export const TabLink = tw(Link)`
  inline-block 
`;

export const TabContent = tw.div``;

interface iTabItem {
  active: boolean;
}
export const TabItem = styled.div<iTabItem>`
  ${({ active }) => (active ? tw`` : tw`hidden`)}
`;

interface iTab {
  value: string;
  title: string;
  content: ReactElement;
}
interface iTabs {
  tabs: iTab[];
}

const Tabs = ({ tabs }: iTabs) => {
  const { query } = useRouter();
  const [activeTab, setActiveTab] = useState(query.tab);

  useEffect(() => {
    setActiveTab(query.tab);
  }, [query.tab]);

  return (
    <>
      {" "}
      <TabContainer>
        <TabLinkItems>
          {tabs.map((tab) => (
            <TabLinkItem key={tab.value} active={activeTab === tab.value}>
              <TabLink href={{ pathname: "", query: { tab: tab.value } }}>
                {tab.title}
              </TabLink>
            </TabLinkItem>
          ))}
        </TabLinkItems>
      </TabContainer>
      <TabContent>
        {tabs.map((tab) => (
          <TabItem key={tab.value} active={activeTab === tab.value}>
            {tab.content}
          </TabItem>
        ))}
      </TabContent>
    </>
  );
};

export default Tabs;
