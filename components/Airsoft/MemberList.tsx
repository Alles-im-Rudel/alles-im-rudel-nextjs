import React, {createRef, useEffect, useRef, useState} from 'react';
import tw from 'twin.macro';
import HeadlineItem from '../Layout/HeadlineItem';
import iAirsoftTeam from "../../Interfaces/iAirsoftTeam";
import Member from "./Member";
import {TextButton} from '../Button';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faLink} from "@fortawesome/free-solid-svg-icons";
import styled from '@emotion/styled';

const Wrapper = tw.div`
    my-10
`;

const ListHeadline = tw.div`
    border-b
    px-5
    mb-10
    flex
    justify-between
    items-center
    cursor-pointer
`;

const ListWrapper = tw.div`
    flex
    gap-4
    transition-all
    overflow-hidden
    max-h-0
`;


type iStyledIcon = {
    isOpen: boolean
}
const StyledIcon = styled(FontAwesomeIcon)<iStyledIcon>`
  ${tw`
        transition-all
  `};
  ${({isOpen}) => isOpen && tw`rotate-180`};
`;

type iMemberList = {
    memberList: iAirsoftTeam[];
    headline: string;
}
const MemberList = ({headline, memberList}: iMemberList) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const handleExpend = () => {
        setIsOpen(!isOpen)
        if (ref.current) {
            const height = ref.current?.style.maxHeight;
            if (height == "0px" || height.length == 0) {
                ref.current.style.maxHeight = `${ref.current.scrollHeight + 32}px`;
            } else {
                ref.current.style.maxHeight = `0px`;
            }
        }
    }

    return (
        <Wrapper>
            <ListHeadline onClick={() => {handleExpend()}}>
                <HeadlineItem headline={3}>
                    {headline}
                </HeadlineItem>
                <StyledIcon isOpen={isOpen} icon={faChevronDown} />
            </ListHeadline>
            <ListWrapper ref={ref}>
                {memberList.map(item => <Member key={item.id} member={item} />)}
            </ListWrapper>
        </Wrapper>
    );
};

export default MemberList;
