import React from 'react';
import iUser from "../../../Interfaces/iUser";
import tw from "twin.macro";
import _image from "next/image";

const Chip = tw.div`
    rounded-full
    bg-secondary
    flex
    overflow-hidden
    w-fit
    h-[32px]
    items-center
`;

const Image = tw(_image)`
   object-cover
   rounded-full
   h-[32px]
   w-[32px]
`;

const Title = tw.div`
    px-3
    text-black
    text-small
`;

interface iUserChip {
    user: iUser
    css?: unknown
}
const UserChip = ({user, ...props}: iUserChip) => {
    return (
        <Chip {...props}>
            {user?.thumbnail?.thumbnail && <Image src={user.thumbnail.thumbnail} alt="test" width={50}
                    height={50}
            />}
            <Title>{user.fullName}</Title>
        </Chip>
    );
};

export default UserChip;
