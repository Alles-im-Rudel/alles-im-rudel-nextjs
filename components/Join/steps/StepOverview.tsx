import React from 'react';
import tw from 'twin.macro';
import Headline from '../../Layout/Headline';
import Text from '../../Layout/Text';
import useJoinStore from "../../../lib/Join/store";
import {shallow} from "zustand/shallow";
import Button from "../../Button";
import useStepperStore from "../../Elements/Stepper/store";
import {SubmitHandler, useForm} from "react-hook-form";
import Checkbox from "../../Form/Checkbox";

const Grid = tw.div`
    grid
    grid-cols-2
`;

const ActionRow = tw.div`
    justify-between
    flex
    mt-4
`;

const FormWrapper = tw.div`
    my-5
`;

const InputWrapper = tw.div`
   flex
   gap-3
`;

const Ul = tw.ul`
    list-disc
    list-inside
`;

export type iOverviewForm = {
    hasAcceptedDataProtection: boolean;
    hasAcceptedMonthlyDebits: boolean;
    wantsEmailNotification: boolean;
}

const StepOverview = () => {
    const {handleSubmit, control} = useForm<iOverviewForm>({
        defaultValues: {
            hasAcceptedDataProtection: false,
            hasAcceptedMonthlyDebits: false,
            wantsEmailNotification: false,
        },
        mode: "onSubmit",
    });

    const [
        form,
        branches,
        setForm,
        submit,
    ] = useJoinStore((state) => [
        state.form,
        state.branches,
        state.setForm,
        state.submit,
    ], shallow);

    const [
        previousStep,
    ] = useStepperStore((state) => [
        state.previousStep,
    ], shallow);

    const totalAmount = () => {
        let totalAmount = 0;
        form.branchIds.forEach(branchId => {
            const branch = branches.find(branch => branch.id === branchId)
            if (branch) {
                totalAmount += branch.price;
            }
        })
        return totalAmount
    }

    const onSubmit: SubmitHandler<iOverviewForm> = (data) => {
        setForm(data);
        submit();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid>
                <div>
                    <Headline headline={4}>
                        Pers??nliche Informationen
                    </Headline>
                    <Text>
                        {form.salutation} {form.firstName} {form.lastName}
                    </Text>
                    <Text>{form.street}</Text>
                    <Text>{form.postcode} {form.city}</Text>
                    <Text>{form.country}</Text>
                    <br />
                    <Text>{form.phone}</Text>
                    <Text>{form.email}</Text>
                </div>
                <div>
                    <Headline headline={4}>
                        Bankdaten
                    </Headline>
                    <Text>
                        {form.mandat.iban}
                    </Text>
                    <Text>{form.mandat.bic}</Text>
                    <Text>Gesamtbeitrag: {totalAmount()}???</Text>
                </div>
            </Grid>
            <div>
                <Headline headline={4}>
                    Sparten
                </Headline>
                <Ul>
                    {branches.map(branch => (form.branchIds.some(branchId => branchId === branch.id) &&
                      <li key={branch.id}>
                          {branch.name}
                      </li>)
                    )}
                </Ul>
            </div>
            <FormWrapper>
                <InputWrapper>
                    <Checkbox
                        name="hasAcceptedDataProtection"
                        placeholder="Vereinssatzung und Datenschutzerkl??rung"
                        control={control}
                        rules={{
                            required: true,
                        }}
                    />
                    Hiermit akzeptiere ich die Vereinssatzung und die Datenschutzerkl??rung.
                </InputWrapper>
                <InputWrapper>
                    <Checkbox
                        name="hasAcceptedMonthlyDebits"
                        placeholder="monatliche Abbuchung"
                        control={control}
                        rules={{
                            required: true,
                        }}
                    />
                    Hiermit best??tige ich die monatliche Abbuchung des Vereinsbeitrags und der Spartenbeit??ge.
                </InputWrapper>
                <InputWrapper>
                    <Checkbox
                        name="wantsEmailNotification"
                        placeholder="E-Mail benachrichtigt"
                        control={control}
                        rules={{
                            required: true,
                        }}
                    />
                    Hiermit best??tige ich, dass ich per E-Mail benachrichtigt werden darf.
                </InputWrapper>
            </FormWrapper>
            <ActionRow>
                <Button secondary type="button" onClick={() => previousStep()}>Zur??ck</Button>
                <Button type="submit">Beitreten</Button>
            </ActionRow>
        </form>
    );
};

export default StepOverview;
