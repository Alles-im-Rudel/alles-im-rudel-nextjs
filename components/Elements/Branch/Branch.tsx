import React from 'react';
import iBranche from "../../../Interfaces/iBranche";
import tw from "twin.macro";
import _image from "next/image";
import {Link} from '../../Button';

const Wrapper = tw.div`
    relative
    w-full
    overflow-hidden
`;

const ImageWrapper = tw.div`
    w-full
    h-[60vh]
    blur
`;

const Image = tw(_image)`
   object-cover
   h-full
   w-full
`;

const TextContainer = tw.div`
    absolute
    w-full
    h-full
    top-0
    text-white
    flex
`;

const TextWrapper = tw.div`
    max-w-screen-lg
    m-auto
    flex
    flex-col
    gap-4
`;

const Title = tw.h3`
    text-headline
`;

const Text = tw.p`
    text-text
`;

type BranchProps = {
    branch: iBranche
};

const Branch = ({branch}: BranchProps) => {
    return (
        <Wrapper>
            <ImageWrapper>
                <Image
                    src={"http://localhost:1337" + branch.attributes.image.data.attributes.url}
                    alt="test"
                    width={1200}
                    height={600}
                />
            </ImageWrapper>
            <TextContainer>
                <TextWrapper>
                    <Title>{branch.attributes.displayName}</Title>
                    <Text>{branch.attributes.description}</Text>
                    <Link
                        href={"/branches/" + branch.attributes.name}
                    >
                        Mehr erfahren
                    </Link>
                </TextWrapper>
            </TextContainer>
        </Wrapper>
    );
};

export default Branch;
