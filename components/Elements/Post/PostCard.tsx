import React from 'react';
import IPost from "../../../Interfaces/iPost";
import tw from "twin.macro";
import _image from 'next/image'
import TagChip from '../Tag/TagChip';
import {Link} from '../../Button';
import UserChip from '../User/UserChip';

const Card = tw.div`
    flex
    flex-col
    gap-2
    shadow-2xl   
`;

const ImageWrapper = tw.div`
   h-[370px]
   w-[370px]
   relative
`;

const Image = tw(_image)`
   object-cover
   h-full
   w-full
`;

const Title = tw.p`
    text-text
`;

const Date = tw.p`
    text-small
`;

const TextWrapper = tw.div`
    p-3
`;

const ActionWrapper = tw.div`
    flex
    justify-between
    items-center
    p-3
    border-t
    border-t-secondary
`;

type PostCardProps = {
    post: IPost
};

const PostCard = ({post}: PostCardProps) => {

    return (
        <Card>
            <ImageWrapper>
                <Image src={post.thumbnail.thumbnail} alt="test" width={400}
                       height={400}
                />
                <UserChip user={post.user} css={tw`absolute bottom-0 right-0 m-3`} />
            </ImageWrapper>
            <TextWrapper>
                <Title>
                    {post.title}
                </Title>
                <Date>
                    {post.createdAt}
                </Date>
            </TextWrapper>
            <ActionWrapper>
                <TagChip color={post.tag.color}>
                    {post.tag.name}
                </TagChip>
                <Link
                    greyBlue
                    href={`/posts/${post.id}`}
                >
                    Ansehen
                </Link>
            </ActionWrapper>
        </Card>
    );
};

export default PostCard;
