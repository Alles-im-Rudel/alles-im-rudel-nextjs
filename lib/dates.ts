import dayjs, { Dayjs } from "dayjs";
export const today = () => {
    return dayjs();
};

export const date = (date: string | Dayjs, defaultVal?: '-') => {
    return date ? dayjs(date).format('DD.MM.YYYY') : defaultVal;
};

export const dateTime = (date: string | Dayjs, defaultVal?: '-') => {
    return date ? dayjs(date).format('DD.MM.YYYY, HH:mm') : defaultVal;
};

export const dateTimeSek = (date: string | Dayjs, defaultVal?: '-') => {
    return date ? dayjs(date).format('DD.MM.YYYY, HH:mm:ss') : defaultVal;
};

export const monthYear = (date: string | Dayjs, defaultVal?: '-') => {
    return date ? dayjs(date).format('MMMM YYYYY') : defaultVal;
};

export const age = (date: string | Dayjs) => {
   return today().diff(dayjs(date), 'year')
};
