import React from 'react';
import iPartner from '../../../Interfaces/iPartner';
import tw from "twin.macro";
import ImageWithLoader from "../../Layout/Image"

const ImageWrapper = tw.div`
    flex
    flex-col
    my-10
    items-center
    lg:gap-5
`;

const Image = tw(ImageWithLoader)`
   object-contain
   h-40
   w-2/3
`;


type PartnerListProps = {
    partners: iPartner[]
}
const PartnerList = ({partners}: PartnerListProps) => {
    return (
        <ImageWrapper>
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
