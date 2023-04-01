import React from 'react';
import iPartner from '../../../Interfaces/iPartner';
import tw from "twin.macro";
import ImageWithLoader from "../../Layout/Image"

const ImageWrapper = tw.div`
    max-w-screen-xl
    flex
    flex-col
    my-base
    px-small
    items-center
    gap-base
`;

const Image = tw(ImageWithLoader)`
   object-contain
   max-h-[16rem]
   h-fit
   w-full
`;


type PartnerListProps = {
    partners: iPartner[];
}
const PartnerList = ({partners, ...props}: PartnerListProps) => {
    return (
        <ImageWrapper {...props}>
            {partners.map((item) => <Image
                key={item.id}
                src={item.attributes.logo.data.attributes.url}
                alt="test"
                width={400}
                height={250}
            />)}
        </ImageWrapper>

    );
};

export default PartnerList;
