import React from "react";
import { css } from "@emotion/react";
import ErrorMessage from "./Input/ErrorMessage";
import FormError from "./Input/FormError";
import { useController } from "react-hook-form";
import styled from "@emotion/styled";
import iOption from "../../Interfaces/iSelect";
import tw from "twin.macro";

type iContainer = {
  fullWidth?: boolean;
};
export const Container = styled.div<iContainer>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "unset")};
  position: relative;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const Placeholder = styled.label`
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

type iStyledSelect = {
  fullWidth?: boolean;
};
export const StyledSelect = styled.select<iStyledSelect>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "fit-content")};
  cursor: pointer;
  padding: 20px 0 0;
  outline: none;
  background-color: unset;

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

interface iSelect {
  name: string;
  fullWidth?: boolean;
  id?: string | null;
  placeholder: string;
  errors?: any;
  rules: any;
  control: any;
  disabled?: boolean;
  options: iOption[];
}

const Select = ({
  errors,
  placeholder,
  disabled,
  options,
  ...props
}: iSelect) => {
  const { field, fieldState } = useController(props);

  return (
    <Container fullWidth={props.fullWidth}>
      <StyledSelect fullWidth={props.fullWidth} id={props.name} {...field}>
        <option value="" disabled>
          Bitte wählen
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={option.value === field.value}
          >
            {option.name}
          </option>
        ))}
      </StyledSelect>
      <Placeholder htmlFor={props.name}>{placeholder}</Placeholder>
      {fieldState.error && (
        <ErrorMessage
          error={fieldState.error}
          name={placeholder}
          rules={props.rules}
        />
      )}
      {errors && Array.isArray(errors) && <FormError message={errors[0]} />}
    </Container>
  );
};

export default Select;
