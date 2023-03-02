import styled from '@emotion/styled';
import React from 'react';
import tw from 'twin.macro';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Container = tw.div`
  relative
  flex
  flex-col
  cursor-pointer
  border-b
  border-b-secondary
  hover:border-b-primary
  pb-[2px]
`;

const Placeholder = tw.label`
  text-darkGrey 
  text-small
`;

const Input = tw.input`
  cursor-pointer
  block 
  w-full 
  text-small 
  text-slate-500
  file:mr-4
  file:py-1
  file:px-3
  file:rounded-full
  file:border-0
  file:text-small
  file:font-semibold
  file:bg-greyBlue
  file:text-white
`;

interface iFileInput {
    name: string;
    placeholder: string;
    onChange: any;
}

const FileInput = ({name, placeholder, onChange}: iFileInput) => {
    return (
        <Wrapper>
            <Container>
                <Placeholder>{placeholder}</Placeholder>
                <Input
                    type="file"
                    name={name}
                    onChange={onChange}
                />
            </Container>
        </Wrapper>
    );
};

export default FileInput;
