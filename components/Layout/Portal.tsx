import React, { ReactElement, useEffect } from "react";

import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import tw from "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { TextButton } from "../Button";

const id = "Modal-PortalAnchor";

const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: white;
  overflow: scroll;
`;

const ModalHeadline = tw.div`
  flex
  sticky
  top-0
  justify-between
  items-center
  p-smaller
  border-b
  bg-white
  z-1
`;

const ModalActionRow = tw.div`
  flex
  justify-between
  items-center
  p-smaller
  border-t
  bg-white
`;

const ModalContainer = tw.div`
  p-smaller
`;

interface iModalPortal {
  isActive: boolean;
  onClose: () => void;
  children: ReactElement;
  headline: string | ReactElement;
  actionRow?: string | ReactElement;
}
const ModalPortal = ({
  isActive,
  onClose,
  headline,
  actionRow,
  children,
}: iModalPortal) => {
  const target = document.getElementById(id);
  const html = document.querySelector("html");

  useEffect(() => {
    if (isActive && html) {
      html.style.overflow = "hidden";
    }

    return () => {
      if (html) {
        html.style.overflow = "auto";
      }
    };
  }, [isActive, html]);

  return target
    ? createPortal(
        <Modal>
          <ModalHeadline>
            {headline}
            <TextButton onClick={onClose}>
              <FontAwesomeIcon icon={faClose} />
            </TextButton>
          </ModalHeadline>
          <ModalContainer>{children}</ModalContainer>
          {actionRow && <ModalActionRow>{actionRow}</ModalActionRow>}
        </Modal>,
        target
      )
    : null;
};
export default ModalPortal;

export const ModalPortalAnchor = (
  // eslint-disable-next-line no-undef
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>
) => <div {...{ ...props, id }} />;
