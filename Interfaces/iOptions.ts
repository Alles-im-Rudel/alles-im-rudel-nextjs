import {PerPageEnum} from "../lib/Management/User/store";

export interface iOptions {
    perPage: PerPageEnum;
    page: number;
    sortBy: string;
    total: number;
}

export default iOptions;
