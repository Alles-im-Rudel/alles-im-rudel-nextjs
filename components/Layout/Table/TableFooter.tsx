import React from "react";
import tw from "twin.macro";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextButton } from "../../Button";
import iOption from "../../../Interfaces/iOptions";
import { PerPageEnum } from "../../../lib/Management/User/store";

const Row = tw.div`
  flex
  text-small
  text-right
  p-smaller
  justify-end
  items-center
  gap-smaller
`;

interface iTableFooter {
  options: iOption;
  setOptions: (key: string, value: number | string | boolean) => void;
}

const TableFooter = ({ options, setOptions }: iTableFooter) => {
  const start =
    options.total === 0
      ? ""
      : options.perPage * options.page - options.perPage === 0
      ? 1
      : options.perPage * options.page - (options.perPage - 1);
  const end =
    options.total === 0
      ? ""
      : options.perPage * options.page > options.total
      ? options.total
      : options.perPage * options.page;
  return (
    <Row>
      Rows per page:
      <select
        value={options.perPage}
        onChange={(event) => setOptions("perPage", event.target.value)}
      >
        <option value={PerPageEnum.ten}>{PerPageEnum.ten}</option>
        <option value={PerPageEnum.thirty}>{PerPageEnum.thirty}</option>
        <option value={PerPageEnum.fifty}>{PerPageEnum.fifty}</option>
      </select>
      {start}-{end} {options.total > 0 ? `of ${options.total}` : ""}
      <TextButton
        disabled={options.total === 0 || options.page === 1}
        onClick={() => setOptions("page", options.page - 1)}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </TextButton>
      <TextButton
        disabled={
          options.total === 0 || options.page >= options.total / options.perPage
        }
        onClick={() => setOptions("page", options.page + 1)}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </TextButton>
    </Row>
  );
};

export default TableFooter;
