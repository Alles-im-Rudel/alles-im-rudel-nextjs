import React, {useEffect} from 'react';
import Headline from '../../Layout/Headline';
import Text from "../../Layout/Text"
import Input from "../../Form/Input";
import Button from "../../Button";
import tw from "twin.macro";
import useJoinStore from "../../../lib/Join/store";
import {shallow} from "zustand/shallow";
import useStepperStore from "../../Elements/Stepper/store";
import {SubmitHandler, useForm} from "react-hook-form";
import CountrySelect from "../../Form/CountrySelect";
import {date, today} from "../../../lib/dates";
import FileInput from "../../Form/FileInput";
import FormRow from "../../Layout/FormRow";
import Form from "../../Layout/Form";

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
    signature: any;
    date: string;
}

const StepHowToPay = () => {
    const {handleSubmit, control, setValue} = useForm<iHowToPayForm>({
        defaultValues: {
            firstName: "",
            lastName: "",
            street: "",
            postcode: "",
            city: "",
            country: "Deutschland",
            iban: "",
            bic: "",
            location: "",
            signature: "null",
            date: date(today()),
        },
        mode: "onSubmit",
    });

    const [
        setForm,
        mandateReference,
    ] = useJoinStore((state) => [
        state.setForm,
        state.mandateReference,
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
            <Text>Mandatsreferenz: {mandateReference}</Text>
            <Headline headline={3}>SEPA-Lastschrift-Mandat</Headline>
            <Text>Ich ermächtige Alles im Rudel e.V., Zahlungen von meinem Konto mittels Lastschrift einzuziehen.
                Zugleich weise ich mein Kreditinstitut an, die von Alles im Rudel e.V. auf mein Konto gezogenen
                Lastschriften einzulösen.
                Hinweis: Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des
                belasteten Betrags verlangen. Es gelten dabei die mit meinem Kreditinstitut vereinbarten
                Bedingungen.
            </Text>
            <Text>Daten des Kontoinhabers</Text>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormRow>
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
                </FormRow>
                <FormRow>
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
                    <CountrySelect
                        fullWidth
                        placeholder="Land"
                        name="country"
                        rules={{
                            required: true,
                            maxLength: 30,
                        }}
                        control={control}
                    />
                </FormRow>
                <FormRow>
                    <Input
                        fullWidth
                        placeholder="IBAN"
                        name="iban"
                        mask="aa99 9999 9999 9999 9999 99"
                        rules={{
                            required: true,
                            maxLength: 27,
                        }}
                        control={control}
                    />
                    <Input
                        fullWidth
                        placeholder="BIC"
                        name="bic"
                        mask="99999999999"
                        rules={{
                            required: true,
                            maxLength: 20,
                        }}
                        control={control}
                    />
                </FormRow>
                <FormRow>
                    <Input
                        isDisabled
                        fullWidth
                        placeholder="Datum"
                        name="date"
                        rules={{
                            required: true,
                            maxLength: 10,
                        }}
                        control={control}
                    />
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
                    <FileInput
                        placeholder="Unterschrift Hochladen"
                        name="signature"
                        onChange={(event: any) => {
                            setValue("signature", event.target.files[0] );
                        }}
                    />
                </FormRow>
                <ActionRow>
                    <Button secondary type="button" onClick={() => previousStep()}>Zurück</Button>
                    <Button type="submit">Weiter</Button>
                </ActionRow>
            </Form>
        </div>
    );
};

export default StepHowToPay;
