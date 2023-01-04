import React from 'react';
import IPost from "../../../Interfaces/iPost";
import PostCard from "./PostCard";
import tw from "twin.macro";

const ListWrapper = tw.div`
    flex
    gap-10
    m-20
`;

type PostsProps = {
    posts: IPost[]
}

const PostsPreviewList = ({posts}: PostsProps) => {
    return (
        <ListWrapper>
            {posts.map((item) => <PostCard key={item.id} post={item} />)}
        </ListWrapper>
    );
};

export default PostsPreviewList;


