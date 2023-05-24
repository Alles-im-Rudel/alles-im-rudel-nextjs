import { useEffect, useState } from "react";
import { PerPageEnum } from "../lib/Management/User/store";
import iOptions from "../Interfaces/iOptions";

export default function useClientTable() {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState<iOptions>({
    perPage: PerPageEnum.ten,
    page: 1,
    sortBy: "",
    total: 0,
  });
  const [pageData, setPageData] = useState<any>([]);
  const [filters, setFilters] = useState<object>({
    search: "",
  });
  const handleSetOptions = (key: string, value: any) => {
    if (key === "perPage") {
      setOptions((currentState) => {
        return {
          ...currentState,
          perPage: value,
          page: 1,
        };
      });
    } else {
      setOptions((currentState) => {
        return {
          ...currentState,
          [key]: value,
        };
      });
    }
  };

  useEffect(() => {
    const start = options.perPage * options.page - options.perPage;
    const end =
      options.perPage * options.page > data.length
        ? data.length
        : options.perPage * options.page;
    setPageData(data.slice(start, end));
    setOptions((currentState) => {
      return {
        ...currentState,
        total: data.length,
      };
    });
  }, [data]);

  useEffect(() => {
    const start = options.perPage * options.page - options.perPage;
    const end =
      options.perPage * options.page > options.total
        ? options.total
        : options.perPage * options.page;
    setPageData(data.slice(start, end));
  }, [options.perPage, options.page]);

  return { pageData, options, handleSetOptions, setData };
}
