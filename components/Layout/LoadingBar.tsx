import styled from '@emotion/styled';
import React from 'react';
import tw from "twin.macro";

interface iLoader {
    loading: boolean;
}

const LoaderWrapper = styled.div<iLoader>`
  ${({loading}) => loading ? tw`block` : tw`hidden`}
  ${tw`w-full`}
`;

const Loader = tw.div`
    h-[2px]
    w-1
    bg-primary
    animate-loading
`;
interface iLoadingBar  {
    loading: boolean
}
const LoadingBar = ({loading}: iLoadingBar) => {
    return (
        <LoaderWrapper loading={loading}>
            <Loader />
        </LoaderWrapper>
    );
};

export default LoadingBar;
