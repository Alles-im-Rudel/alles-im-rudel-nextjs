import React from "react";

const FormError = ({ className = "", message, gtag }) => {
    return (
        <p
            className={`help ${className !== "" ? className : "is-danger"}`}
            {...(gtag ? { "data-gtag": gtag } : {})}
        >
            {message}
        </p>
    );
};

export default FormError;
