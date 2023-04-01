import React from 'react';
import tw from "twin.macro";
import {faCheck, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {TextButton} from '../../Button';
import iOption from "../../../Interfaces/iOptions";

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

const TableFooter = ({options, setOptions}: iTableFooter) => {
    const start = options.perPage * options.page - 10 === 0 ? 1 : options.perPage * options.page - 9;
    const end = options.perPage * options.page > options.total ? options.total : options.perPage * options.page;

    return (
        <Row>
            Rows per page:
            <select value={options.perPage} onChange={(event) => setOptions("perPage", event.target.value)}>
                <option value="10">10</option>
                <option value="30">30</option>
                <option value="50">50</option>
            </select>
            {start}-{end} of {options.total}
            <TextButton disabled={options.page === 1} onClick={() => setOptions("page", options.page - 1)}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </TextButton>
            <TextButton disabled={options.page >= options.total % options.perPage}
                        onClick={() => setOptions("page", options.page + 1)}>
                <FontAwesomeIcon icon={faChevronRight} />
            </TextButton>
        </Row>
    );
};

export default TableFooter;
