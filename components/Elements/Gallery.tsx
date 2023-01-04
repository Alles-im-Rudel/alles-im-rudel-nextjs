import React, {useState} from 'react';
import iGallery from "../../Interfaces/iGallery";
import tw from "twin.macro";
import _image from "next/image";
import {TextButton} from '../Button';
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";

const Wrapper = tw.div`
    relative
    w-full
    h-[80vh]
    overflow-hidden
`;

const BackgroundImage = tw(_image)`
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
   gap-5
   text-white
`;

const Styled90Icon = tw(FontAwesomeIcon)`
    rotate-90
`;

const ImageWrapper = tw.div`
   w-[50%]
   h-[80%]
`;

const Image = tw(_image)`
   object-cover
   w-full
   h-full
`;

const DotList = tw.div`
    absolute
    bottom-4
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
     h-4
     w-4
  `}
  ${({isActive}) => isActive ? tw`bg-white` : tw`bg-secondary`}
`;

type iGalleryElement = {
    gallery: iGallery[]
}
const Gallery = ({gallery}: iGalleryElement) => {
    const length = gallery.length - 1;
    const [currentItem, setCurrentItem] = useState(0)
    const BackgroundImages = gallery.map(item => <BackgroundImage
        key={item.id}
        src={"http://localhost:1337" + item.attributes.url}
        alt="test"
        width={1000}
        height={1000}
    />)
    const Images = gallery.map(item => <Image
        key={item.id}
        src={"http://localhost:1337" + item.attributes.url}
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
        <Wrapper>
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
