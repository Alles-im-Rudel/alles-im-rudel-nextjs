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
    items-center
`;

const Image = tw(_image)`
   object-cover
   rounded-full
   h-7
   w-7
`;

const Title = tw.div`
    px-smaller
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
