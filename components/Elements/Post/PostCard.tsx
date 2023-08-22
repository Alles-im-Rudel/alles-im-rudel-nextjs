import React from "react";
import IPost from "../../../Interfaces/iPost";
import tw from "twin.macro";
import _image from "next/image";
import { Link } from "../../Button";
import { dateTime } from "../../../lib/dates";
import { Color } from "../../Button/BackgroundColor";
import ImageWithLoader from "../../Layout/Image";
import TagChip from "../Tag/TagChip";

const Card = tw.div`
    flex
    flex-col
    gap-smaller
    shadow-xl
    justify-between
    max-w-[19.5rem]
`;

const ImageWrapper = tw.div`
   h-72
   w-full
   relative
   z-0
`;

const Image = tw(ImageWithLoader)`
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
    px-smaller
`;

const ActionWrapper = tw.div`
    flex
    justify-between
    items-center
    p-smaller
    border-t
    border-t-secondary
`;

type PostCardProps = {
  post: IPost;
};

const PostCard = ({ post }: PostCardProps) => {
  console.log(post.images);
  return (
    <Card>
      <ImageWrapper>
        <Image
          src={post.attributes.images?.data[0].attributes.url}
          alt="test"
          width={400}
          height={400}
        />
        {/*<UserChip user={post.user} css={tw`absolute bottom-0 right-0 m-3`} />*/}
      </ImageWrapper>
      <TextWrapper>
        <Title>{post.attributes.title}</Title>
        <Date>{dateTime(post.attributes.createdAt)}</Date>
      </TextWrapper>
      <ActionWrapper>
        <TagChip color={post.attributes.tag.color}>
          {post.attributes.tag.tag}
        </TagChip>
        <Link color={Color.greyBlue} href={`/posts/${post.id}`}>
          Ansehen
        </Link>
      </ActionWrapper>
    </Card>
  );
};

export default PostCard;
