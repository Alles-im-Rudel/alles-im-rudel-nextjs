import React from "react";

interface iFormError {
    className?: string;
    message?: string;

}
const FormError = ({ className = "", message }: iFormError) => {
    return (
        <p
            className={`help ${className !== "" ? className : "is-danger"}`}
        >
            {message}
        </p>
    );
};

export default FormError;
