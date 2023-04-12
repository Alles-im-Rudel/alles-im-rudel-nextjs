import React from "react";
import Input from "../../Form/Input";
import Button from "../../Button";
import tw from "twin.macro";
import useJoinStore from "../../../lib/Join/store";
import { shallow } from "zustand/shallow";
import useStepperStore from "../../Elements/Stepper/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { Color } from "../../Button/BackgroundColor";

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

export type iChoosPasswordForm = {
  password: string;
  passwordRepeat: string;
};

const StepHowToPay = () => {
  const { handleSubmit, control } = useForm<iChoosPasswordForm>({
    defaultValues: {
      password: "",
      passwordRepeat: "",
    },
    mode: "onSubmit",
  });

  const [setForm] = useJoinStore((state) => [state.setForm], shallow);

  const [nextStep, previousStep] = useStepperStore(
    (state) => [state.nextStep, state.previousStep],
    shallow
  );

  const onSubmit: SubmitHandler<iChoosPasswordForm> = (data) => {
    setForm(data);
    nextStep();
  };

  return (
    <div>
      <InputWrapper onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Input
            fullWidth
            placeholder="Passwort"
            name="password"
            type="password"
            rules={{
              required: true,
              maxLength: 20,
            }}
            control={control}
          />
          <Input
            fullWidth
            placeholder="Passwort wiederholen"
            name="passwordRepeat"
            type="password"
            rules={{
              required: true,
              maxLength: 20,
            }}
            control={control}
          />
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
    </div>
  );
};

export default StepHowToPay;
