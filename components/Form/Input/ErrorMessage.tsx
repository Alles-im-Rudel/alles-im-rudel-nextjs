import React from "react";

import tw from "twin.macro";

const ErrorWrapper = tw.div`
    text-small
    text-error
`;

interface iErrorMessage {
  error: any;
  name: string;
  rules: any;
}

const ErrorMessage = ({ error, name, rules }: iErrorMessage) => {
  const getMessage = (type: string): string => {
    const messages: { [key: string]: string } = {
      required: `${name} muss ausgefühllt werden.`,
      maxLength: `${name} darf maximal ${rules.maxLength} zeichen lang sein.`,
      minLength: `${name} muss minimal ${rules.minLength} zeichen lang sein.`,
      custom: error.message,
    };
    if (messages[type]) {
      return messages[type];
    }
    return "Fehler";
  };
  console.log(error, name, rules);
  return (
    <ErrorWrapper>{error && <p>{getMessage(error.type)}</p>}</ErrorWrapper>
  );
};

export default ErrorMessage;
