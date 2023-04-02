import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "./Input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { TextButton } from '../Button';

export type iSearchForm = {
    search: string;
}

interface iSearch {
    submit: (data: iSearchForm) => void
}

const Search = ({submit}: iSearch) => {

    const {handleSubmit, control} = useForm<iSearchForm>({
        defaultValues: {
            search: "",
        },
        mode: "onSubmit",
    });

    const onSubmit:SubmitHandler<iSearchForm> = (data) => {
        submit(data)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                fullWidth
                placeholder="Suche"
                name="search"
                rules={{
                    required: false,
                    maxLength: 30,
                }}
                submit={<TextButton type="submit"><FontAwesomeIcon icon={faMagnifyingGlass}/></TextButton>}
                control={control}
            />
        </form>
    );
};

export default Search;
