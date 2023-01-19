import React, {useEffect, useState} from 'react';
import useDebounce from '../../hooks/useDebounce';
import Input from "./Input";
import {apiFetch, Endpoint} from "../../lib/api";

interface iEmailInput {
    rules: any;
    control: any;
    watchEmail: any;
}
const EmailInput = ({control, rules, watchEmail}: iEmailInput) => {
    const debouncedSearch = useDebounce(watchEmail, 1000)
    const [isLoading, setIsLoading] = useState(false)
    const [isValid, setIsValid] = useState<boolean | null>(null);
    useEffect(() => {
        if (debouncedSearch) {
            checkEmail()
        } else {
            setIsValid(false)
        }
    }, [debouncedSearch])

    const checkEmail = () => {
        setIsLoading(true);
        apiFetch(
            `/profile/check-email/${watchEmail}`, Endpoint.backend
        ).then((response) => {
            setIsValid(response.isValid !== false)
            setIsLoading(false);
        }).catch((error) => {
            setIsValid(false)
            setIsLoading(false);
        });
    }

    return (
        <Input
            fullWidth
            placeholder="E-Mail"
            name="email"
            rules={rules}
            control={control}
            isLoading={isLoading}
            isValid={isValid}
        />
    );
};

export default EmailInput;
