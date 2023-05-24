import { PerPageEnum } from "../components/Layout/Table/BaseTableStore";

export interface iOptions {
  perPage: PerPageEnum;
  page: number;
  sortBy: string;
  total: number;
}

export default iOptions;
