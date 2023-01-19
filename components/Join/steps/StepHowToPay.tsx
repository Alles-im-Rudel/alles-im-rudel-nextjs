import React from 'react';
import Headline from '../../Layout/Headline';
import Text from "../../Layout/Text"
import Input from "../../Form/Input";
import Button from "../../Button";
import tw from "twin.macro";
import useJoinStore from "../../../lib/Join/store";
import shallow from "zustand/shallow";
import useStepperStore from "../../Elements/Stepper/store";
import {SubmitHandler, useForm} from "react-hook-form";
import {iWhoAreYouForm} from "./StepWhoAreYou";

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

export type iHowToPayForm = {
    firstName: string;
    lastName: string;
    street: string;
    postcode: string;
    city: string;
    country: string;
    iban: string;
    bic: string;
    location: string;
    signature: string;
}

const StepHowToPay = () => {

    const {handleSubmit, control} = useForm<iHowToPayForm>({
        defaultValues: {
            firstName: "",
            lastName: "",
            street: "",
            postcode: "",
            city: "",
            country: "",
            iban: "",
            bic: "",
            location: "",
            signature: "",
        },
        mode: "onSubmit",
    });

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

    const onSubmit: SubmitHandler<iHowToPayForm> = (data) => {
        setForm({mandat: data});
        nextStep();
    };

    return (
        <div>
            <Text>Alles im Rudel e.V.</Text>
            <Text>Norderstraße 23</Text>
            <Text>25335 Elmshorn</Text>
            <Text>Deutschland</Text>
            <br />
            <Text>Gläubiger-ID: DE20AIR00002493867</Text>
            <br />
            <br />
            <Text>Mandatsreferenz: AIR 58</Text>
            <Headline headline={3}>SEPA-Lastschrift-Mandat</Headline>
            <Text>Ich ermächtige Alles im Rudel e.V., Zahlungen von meinem Konto mittels Lastschrift einzuziehen.
                Zugleich weise ich mein Kreditinstitut an, die von Alles im Rudel e.V. auf mein Konto gezogenen
                Lastschriften einzulösen.
                Hinweis: Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des
                belasteten Betrags verlangen. Es gelten dabei die mit meinem Kreditinstitut vereinbarten
                Bedingungen.
            </Text>
            <Text>Daten des Kontoinhabers</Text>
            <InputWrapper onSubmit={handleSubmit(onSubmit)}>
                <Row>
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
                        placeholder="Straße & Hausnummer"
                        name="street"
                        rules={{
                            required: true,
                            maxLength: 20,
                        }}
                        control={control}
                    />
                    <Input
                        fullWidth
                        placeholder="Postleitzahl"
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
                            maxLength: 30,
                        }}
                        control={control}
                    />
                    <Input
                        fullWidth
                        placeholder="Land"
                        name="country"
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
                        placeholder="IBAN"
                        name="iban"
                        rules={{
                            required: true,
                            maxLength: 20,
                        }}
                        control={control}
                    />
                    <Input
                        fullWidth
                        placeholder="BIC"
                        name="bic"
                        rules={{
                            required: true,
                            maxLength: 20,
                        }}
                        control={control}
                    />
                </Row>
                <Row>
                    10.01.2023
                    <Input
                        fullWidth
                        placeholder="Ort"
                        name="location"
                        rules={{
                            required: true,
                            maxLength: 20,
                        }}
                        control={control}
                    />
                    <Input
                        fullWidth
                        placeholder="Unterschrift"
                        name="signature"
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
        </div>
    );
};

export default StepHowToPay;
