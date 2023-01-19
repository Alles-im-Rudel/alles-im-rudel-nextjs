import React from 'react';
import tw from 'twin.macro';
import Input from '../../Form/Input';
import {SubmitHandler, useForm} from "react-hook-form";
import useJoinStore from "../../../lib/Join/store";
import useStepperStore from "../../Elements/Stepper/store";
import Button from "../../Button";
import shallow from "zustand/shallow";

const InputWrapper = tw.form`
    flex
    flex-col
    gap-1
`;

const Row = tw.div`
    flex
    gap-6
`;

const ActionRow = tw.div`
    justify-end
    flex
    mt-4
`;

export type iWhoAreYouForm = {
    salutation: string;
    firstName: string;
    lastName: string;
    phone: string;
    birthday: string;
    email: string;
}

type iStepWhoAreYou = {}
const StepWhoAreYou = ({}: iStepWhoAreYou) => {

    const [
        setForm,
    ] = useJoinStore((state) => [
        state.setForm,
    ], shallow);

    const [
        nextStep,
    ] = useStepperStore((state) => [
        state.nextStep,
    ], shallow);


    const {handleSubmit, control} = useForm<iWhoAreYouForm>({
        defaultValues: {
            salutation: "",
            firstName: "",
            lastName: "",
            phone: "",
            birthday: "",
            email: "",
        },
        mode: "onSubmit",
    });

    const onSubmit:SubmitHandler<iWhoAreYouForm> = (data) => {
        setForm(data);
        nextStep();
    };

    return (
        <InputWrapper onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Input
                    fullWidth
                    placeholder="Anrede"
                    name="salutation"
                    rules={{
                        required: true,
                        maxLength: 20,
                    }}
                    control={control}
                />
                <Input
                    fullWidth
                    placeholder="Vorname"
                    name="firstName"
                    rules={{
                        required: true,
                        maxLength: 20,
                    }}
                    control={control}
                />
                <Input
                    fullWidth
                    placeholder="Nachname"
                    name="lastName"
                    rules={{
                        required: true,
                        maxLength: 20,
                    }}
                    control={control}
                />
            </Row>
            <Row>
                <Input
                    fullWidth
                    placeholder="Telefon"
                    name="phone"
                    rules={{
                        required: true,
                        maxLength: 20,
                    }}
                    control={control}
                />
                <Input
                    fullWidth
                    placeholder="Geburstag"
                    name="birthday"
                    rules={{
                        required: true,
                        maxLength: 20,
                    }}
                    control={control}
                />
            </Row>
            <Row>
                <Input
                    fullWidth
                    placeholder="E-Mail"
                    name="email"
                    rules={{
                        required: true,
                        maxLength: 20,
                    }}
                    control={control}
                />
            </Row>
            <ActionRow>
                <Button type="submit">Weiter</Button>
            </ActionRow>
        </InputWrapper>
    );
};

export default StepWhoAreYou;
