import React from 'react';
import tw from 'twin.macro';
import Input from '../../Form/Input';
import useJoinStore from "../../../lib/Join/store";
import {SubmitHandler, useForm} from "react-hook-form";
import Button from "../../Button";
import useStepperStore from "../../Elements/Stepper/store";
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
    justify-between
    flex
    mt-4
`;

export type iWhereAreYouForm = {
    street: string;
    postcode: string;
    city: string;
    country: string;
}

type iStepWhereAreYou = {}
const StepWhereAreYou = ({}: iStepWhereAreYou) => {

    const [
        setForm,
    ] = useJoinStore((state) => [
        state.setForm,
    ], shallow);

    const [
        nextStep,
        previousStep,
    ] = useStepperStore((state) => [
        state.nextStep,
        state.previousStep,
    ], shallow);


    const {handleSubmit, control} = useForm<iWhereAreYouForm>({
        defaultValues: {
            street: "",
            postcode: "",
            city: "",
            country: "",
        },
        mode: "onSubmit",
    });

    const onSubmit:SubmitHandler<iWhereAreYouForm> = (data) => {
        setForm(data)
        nextStep()
    };


    return (
        <InputWrapper onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Input
                    fullWidth
                    placeholder="Straße & Hausnummer"
                    name="street"
                    rules={{
                        required: true,
                        maxLength: 30,
                    }}
                    control={control}
                />
            </Row>
            <Row>
                <Input
                    fullWidth
                    placeholder="PLZ"
                    name="postcode"
                    rules={{
                        required: true,
                        maxLength: 5,
                    }}
                    control={control}
                />
                <Input
                    fullWidth
                    placeholder="Stadt"
                    name="city"
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
                    placeholder="Land auswählen"
                    name="country"
                    rules={{
                        required: true,
                        maxLength: 20,
                    }}
                    control={control}
                />
            </Row>
            <ActionRow>
                <Button type="button" onClick={() => previousStep()}>Zurück</Button>
                <Button type="submit">Weiter</Button>
            </ActionRow>
        </InputWrapper>
    );
};

export default StepWhereAreYou;
