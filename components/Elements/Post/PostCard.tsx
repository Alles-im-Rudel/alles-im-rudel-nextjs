import React from "react";
import IPost, { iPost } from "../../../Interfaces/iPost";
import tw from "twin.macro";
import { Link } from "../../Button";
import { dateTime } from "../../../lib/dates";
import { Color } from "../../Button/BackgroundColor";
import ImageWithLoader from "../../Layout/Image";
import TagChip from "../Tag/TagChip";
import UserChip from "../User/UserChip";
import { css } from "@emotion/react";

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
  post: iPost;
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card>
      <ImageWrapper>
        {typeof post.image !== "string" && post.image.url && (
          <Image src={post.image.url} alt="test" width={400} height={400} />
        )}
        {typeof post.author !== "string" && (
          <UserChip
            user={post.author}
            css={css`
              ${tw`absolute bottom-0 right-0 m-3`}
            `}
          />
        )}
      </ImageWrapper>
      <TextWrapper>
        <Title>{post.title}</Title>
        <Date>{dateTime(post.createdAt)}</Date>
      </TextWrapper>
      <ActionWrapper>
        {typeof post.tag !== "string" && (
          <TagChip color={Color.primary}>{post.tag.name}</TagChip>
        )}
        <Link color={Color.greyBlue} href={`/posts/${post.id}`}>
          Ansehen
        </Link>
      </ActionWrapper>
    </Card>
  );
};

export default PostCard;
