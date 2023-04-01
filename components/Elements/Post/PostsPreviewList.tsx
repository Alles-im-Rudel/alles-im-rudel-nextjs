import React from 'react';
import IPost from "../../../Interfaces/iPost";
import PostCard from "./PostCard";
import tw from "twin.macro";

const ListWrapper = tw.div`
    max-w-screen-xl
    flex
    gap-small
    my-base
    px-small
    flex-wrap
    justify-center
`;

interface PostsProps {
    posts: IPost[];
}
const PostsPreviewList = ({posts}: PostsProps) => {
    return (
        <ListWrapper>
            {posts.map((item) => <PostCard key={item.id} post={item} />)}
        </ListWrapper>
    );
};

export default PostsPreviewList;


