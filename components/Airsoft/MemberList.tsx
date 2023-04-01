import React, {createRef, useEffect, useRef, useState} from 'react';
import tw from 'twin.macro';
import Headline from '../Layout/Headline';
import iAirsoftTeam from "../../Interfaces/iAirsoftTeam";
import Member from "./Member";
import {TextButton} from '../Button';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import styled from '@emotion/styled';

const Wrapper = tw.div`
    max-w-screen-xl
    w-full
    my-base
    px-small
`;

const ListHeadline = tw.div`
    border-b
    mb-small
    flex
    justify-between
    items-center
    cursor-pointer
`;

const ListWrapper = tw.div`
    flex
    gap-smaller
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
    const ref = useRef<HTMLDivElement>(null);

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
                <Headline headline={3}>
                    {headline}
                </Headline>
                <StyledIcon isOpen={isOpen} icon={faChevronDown} />
            </ListHeadline>
            <ListWrapper ref={ref}>
                {memberList.map(item => <Member key={item.id} member={item} />)}
            </ListWrapper>
        </Wrapper>
    );
};

export default MemberList;
