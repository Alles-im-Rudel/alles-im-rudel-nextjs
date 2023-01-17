import React from 'react';
import iPartner from '../../../Interfaces/iPartner';
import tw from "twin.macro";
import _image from "next/image";

const ImageWrapper = tw.div`
    flex
    flex-col
    gap-5
    my-10
`;

const Image = tw(_image)`
   object-cover
   h-full
   w-full
`;


type PartnerListProps = {
    partners: iPartner[]
}
const PartnerList = ({partners}: PartnerListProps) => {
    return (
        <ImageWrapper>
            {partners.map((item) => <Image
                key={item.id}
                src={process.env.NEXT_PUBLIC_CONTENT_URL + item.attributes.logo.data.attributes.url}
                alt="test"
                width={400}
                height={400}
            />)}
        </ImageWrapper>

    );
};

export default PartnerList;
