import React from "react";


import {useController} from "react-hook-form";

import {css} from "@emotion/react";
import styled from "@emotion/styled";

import FormError from "./FormError";
import ErrorMessage from "./ErrorMessage";
import tw from "twin.macro";
import {faCheck, faRightToBracket, faSpinner, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface iWrapper {
    css?: unknown
}

const Wrapper = styled.div<iWrapper>`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  position: relative;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Placeholder = styled.label`
  position: absolute;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: 100%;
  color: #231f21;
  pointer-events: none;
  transition: 0.2s ease all;
  ${tw`text-darkGrey text-base`}
`;

interface iIconWrapper {
    css?: unknown
}
const IconWrapper = styled.div<iIconWrapper>`
  position: absolute;
  right: 0;
  top: 0;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 15px 0 0;
  outline: none;

  ${tw`
    border-b
    border-b-secondary
    text-base
    text-primary
  `}
  &:focus {
    ${tw`border-b-primary`}
  }

  &:placeholder-shown {
    font-weight: normal;
  }

  &:placeholder-shown ~ ${Placeholder} {
    top: 0;
  }

  &:not(:placeholder-shown) ~ ${Placeholder}, &:focus ~ ${Placeholder} {
    top: 2px;
    display: block;
    align-items: flex-start;
    height: 1.5em;
    overflow-x: hidden;
    font-size: 0.75em;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${tw`text-small`}
  }
`;

interface iInput {
    fullWidth?: boolean;
    name: string;
    type?: string;
    id?: string | undefined;
    isDisabled?: boolean;
    withField?: boolean;
    maxWidth?: any;
    placeholder: string;
    errors?: any;
    resetField?: any;
    defaultValue?: string | number;
    rules: any;
    control: any;
    isLoading?: boolean;
    isValid?: boolean | null;
}

const Input = ({
                   fullWidth = false,
                   type = "text",
                   isDisabled = false,
                   withField = false,
                   maxWidth = undefined,
                   placeholder = "",
                   errors,
                   resetField,
                   isLoading,
                   isValid = null,
                   ...props
               }: iInput) => {
    const {field, fieldState} = useController(props);
    return (
        <Wrapper
            css={css`
              max-width: ${maxWidth ?? "none"};
              ${fullWidth ? "width: 100%;" : ""}
            `}
        >
            <Container>
                <StyledInput
                    placeholder=" "
                    autoComplete={
                        [
                            "zipcode",
                            "consumption",
                            "street",
                            "houseNumber",
                            "streetSelectList",
                            "placeSelectList",
                            "houseNumber",
                            "ownerName",
                            "ownerStreet",
                            "ownerStreetNumber",
                            "ownerZipcode",
                            "ownerCity",
                        ].includes(props.name)
                            ? "off"
                            : "on"
                    }
                    disabled={isDisabled}
                    {...field}
                    {...{type, ...props}}
                />
                <Placeholder htmlFor={props.name}>{placeholder}</Placeholder>
                {isLoading && <IconWrapper css={css`${tw`animate-spin`}`}>
                  <FontAwesomeIcon icon={faSpinner} />
                </IconWrapper>}
                {!isLoading && isValid && <IconWrapper css={css`${tw`text-success`}`}>
                  <FontAwesomeIcon icon={faCheck} />
                </IconWrapper>}
                {!isLoading && isValid === false && <IconWrapper css={css`${tw`text-error`}`}>
                  <FontAwesomeIcon icon={faXmark} />
                </IconWrapper>}
            </Container>
            {fieldState.error && (
                <ErrorMessage
                    error={fieldState.error}
                    name={placeholder}
                    rules={props.rules}
                />
            )}
            {errors && Array.isArray(errors) && (
                <FormError message={errors[0]} />
            )}
        </Wrapper>
    );
};
export default Input;
