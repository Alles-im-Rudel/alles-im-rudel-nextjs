import React, { ReactElement, useEffect, useRef } from "react";

import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import tw from "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { TextButton } from "../Button";
import { css } from "@emotion/react";

const id = "Modal-PortalAnchor";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: rgb(33, 33, 33);
  opacity: 0.46;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 101;
  overflow: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const ModalInner = styled.div`
  overflow: scroll;
  background-color: white;
  min-width: 40rem;
  border-radius: 5px;
  pointer-events: auto;
  transition: transform 0.1s ease;
  &.animate {
    transform: scale(1.02);
  }
`;

const FullPageStyle = css`
  width: 100%;
  height: 100%;
  border-radius: 0;
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
  isFullPage?: boolean;
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
  isFullPage = true,
}: iModalPortal) => {
  const target = document.getElementById(id);
  const html = document.querySelector("html");
  const modalRef = useRef<HTMLElement>(null);

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

  const handleBackdropClick = () => {
    modalRef?.current?.classList.add("animate");
    setTimeout(() => modalRef?.current?.classList.remove("animate"), 100);
  };

  return target
    ? createPortal(
        <div>
          <ModalBackdrop onClick={handleBackdropClick} />
          <Modal>
            <ModalInner ref={modalRef} css={isFullPage && FullPageStyle}>
              <ModalHeadline>
                {headline}
                <TextButton onClick={onClose}>
                  <FontAwesomeIcon icon={faClose} />
                </TextButton>
              </ModalHeadline>
              <ModalContainer>{children}</ModalContainer>
              {actionRow && <ModalActionRow>{actionRow}</ModalActionRow>}
            </ModalInner>
          </Modal>
        </div>,
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
