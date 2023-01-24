import dayjs from "dayjs";
export const today = () => {
    return dayjs();
};

export const date = (date: string, defaultVal?: '-') => {
    return date ? dayjs(date).format('DD.MM.YYYY') : defaultVal;
};

export const dateTime = (date: string, defaultVal?: '-') => {
    return date ? dayjs(date).format('DD.MM.YYYY, HH:mm') : defaultVal;
};

export const dateTimeSek = (date: string, defaultVal?: '-') => {
    return date ? dayjs(date).format('DD.MM.YYYY, HH:mm:ss') : defaultVal;
};

export const monthYear = (date: string, defaultVal?: '-') => {
    return date ? dayjs(date).format('MMMM YYYYY') : defaultVal;
};

export const age = (date: string) => {
   return today().diff(dayjs(date), 'year')
};
