import React from "react";
import tw from "twin.macro";
import { SubmitHandler, useForm } from "react-hook-form";
import useJoinStore from "../../../../lib/Join/store";
import useStepperStore from "../../../Elements/Stepper/store";
import Button from "../../../Button";
import { shallow } from "zustand/shallow";
import BranchSelect from "./BranchSelect";
import { Color } from "../../../Button/BackgroundColor";

const InputWrapper = tw.form`
    flex
    flex-col
    gap-1
`;

const Row = tw.div`
    flex
    flex-col
    gap-6
`;

const ActionRow = tw.div`
    justify-between
    flex
    mt-4
`;

type iBranchSelectForm = {
  "Alles im Rudel": boolean;
  Airsoft: boolean;
  "E-Sports": boolean;
};

const StepBranchSelect = () => {
  const [branches, setForm] = useJoinStore(
    (state) => [state.branches, state.setForm],
    shallow
  );

  const [nextStep, previousStep] = useStepperStore(
    (state) => [state.nextStep, state.previousStep],
    shallow
  );

  const { handleSubmit, control } = useForm<iBranchSelectForm>({
    defaultValues: {
      "Alles im Rudel": true,
      Airsoft: false,
      "E-Sports": false,
    },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<iBranchSelectForm> = (data) => {
    let ids: number[] = [];
    // @ts-ignore
    branches.forEach((branch) => data[branch.name] && ids.push(branch.id));
    setForm({ branchIds: ids });
    nextStep();
  };

  return (
    <InputWrapper onSubmit={handleSubmit(onSubmit)}>
      <Row>
        {branches.map((branch) => (
          <BranchSelect key={branch.id} branch={branch} control={control} />
        ))}
      </Row>
      <ActionRow>
        <Button
          color={Color.secondary}
          type="button"
          onClick={() => previousStep()}
        >
          Zurück
        </Button>
        <Button type="submit">Weiter</Button>
      </ActionRow>
    </InputWrapper>
  );
};

export default StepBranchSelect;
