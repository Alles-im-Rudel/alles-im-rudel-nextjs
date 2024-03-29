import React, {useState} from 'react';
import iGallery from "../../Interfaces/iGallery";
import tw from "twin.macro";
import {TextButton} from '../Button';
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";
import ImageWithLoader from "../Layout/Image";

const Wrapper = tw.div`
    relative
    w-full
    h-[40vw]
    overflow-hidden
`;

const BackgroundImage = tw(ImageWithLoader)`
   object-cover
   h-full
   w-full
   blur
`;

const AbsoluteWrapper = tw.div`
   absolute
   top-0
   h-[100%]
   w-[100%]
   flex
   justify-center
   items-center
   gap-small
   text-white
`;

const Styled90Icon = tw(FontAwesomeIcon)`
    rotate-90
`;

const ImageWrapper = tw.div`
   w-[50%]
   h-[80%]
`;

const Image = tw(ImageWithLoader)`
   object-cover
   w-full
   h-full
`;

const DotList = tw.div`
    absolute
    bottom-smaller
    left-0
    w-full
    flex
    gap-1
    justify-center
`;


type iDot = {
    isActive: boolean
}
const Dot = styled.div<iDot>`
  ${tw`
     cursor-pointer
     rounded-full
     h-smaller
     w-smaller
  `}
  ${({isActive}) => isActive ? tw`bg-white` : tw`bg-secondary`}
`;

type iGalleryElement = {
    gallery: iGallery[]
}
const Gallery = ({gallery, ...props}: iGalleryElement) => {
    const length = gallery.length - 1;
    const [currentItem, setCurrentItem] = useState(0)
    const BackgroundImages = gallery.map(item => <BackgroundImage
        key={item.id}
        src={item.attributes.url}
        alt="test"
        width={1000}
        height={1000}
    />)
    const Images = gallery.map(item => <Image
        key={item.id}
        src={item.attributes.url}
        alt="test"
        width={1000}
        height={1000}
    />)

    const next = () => {
        if (currentItem === (length)) {
            setCurrentItem(0);
        } else {
            setCurrentItem(currentItem + 1)
        }
    }

    const previos = () => {
        if (currentItem === 0) {
            setCurrentItem(length)
        } else {
            setCurrentItem(currentItem - 1)
        }
    }

    return (
        <Wrapper {...props}>
            {BackgroundImages[currentItem]}
            <AbsoluteWrapper>
                <TextButton onClick={previos}>
                    <Styled90Icon icon={faChevronDown} />
                </TextButton>
                <ImageWrapper>
                    {Images[currentItem]}
                </ImageWrapper>
                <TextButton onClick={next}>
                    <Styled90Icon icon={faChevronUp} />
                </TextButton>
            </AbsoluteWrapper>
            <DotList>
                {BackgroundImages.map((item, index) => <Dot
                    key={index}
                    onClick={() => setCurrentItem(index)}
                    isActive={index === currentItem}
                />)}
            </DotList>

        </Wrapper>
    );
};

export default Gallery;
