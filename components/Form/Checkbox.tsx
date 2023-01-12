import {css} from '@emotion/react';
import React, {useEffect, useState} from 'react';
import {faSquare} from "@fortawesome/free-regular-svg-icons";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ErrorMessage from "./Input/ErrorMessage";
import FormError from "./Input/FormError";
import {useController} from "react-hook-form";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface iCheckboxWrapper {
    disabled?: boolean
}
const CheckboxWrapper = styled.div<iCheckboxWrapper>`
  ${({disabled}) => disabled ? css`cursor: unset` : css`cursor: pointer`}
`;

interface iStyledFontAwesomeIcon {
    disabled?: boolean
}
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)<iStyledFontAwesomeIcon>`
  ${({disabled}) => disabled ? tw`text-secondary` : tw`text-primary`}
`;

const Input = styled.input`
  display: none;
`;

interface iCheckbox {
    name: string;
    id?: string | null;
    placeholder: string;
    errors?: any;
    rules: any;
    control: any;
    disabled?: boolean;
}
const Checkbox = ({errors, placeholder, disabled, ...props}: iCheckbox) => {

    const {field, fieldState} = useController(props);

    const [checked, setChecked] = useState(field.value);

   useEffect(() => {
       field.onChange(checked)
   }, [checked, field]);

    return (
        <CheckboxWrapper
            onClick={() => !disabled && setChecked(!checked)}
            disabled={disabled}
        >
            <Input
                type="checkbox"
                checked={checked}
                {...field}
            />
            {checked ? <StyledFontAwesomeIcon disabled={disabled} size="lg" icon={faSquareCheck} type="regular" /> :
                <StyledFontAwesomeIcon disabled={disabled} size="lg" icon={faSquare} />}
            {fieldState.error && (
                <ErrorMessage
                    error={fieldState.error}
                    name={placeholder}
                    rules={props.rules}
                />
            )}
            {errors && Array.isArray(errors) && (
                <FormError gtag={`error:${props.name}`} message={errors[0]} />
            )}
        </CheckboxWrapper>
    );
};

export default Checkbox;
