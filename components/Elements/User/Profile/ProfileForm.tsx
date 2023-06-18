import React from "react";
import iUser from "../../../../Interfaces/iUser";
import { SubmitHandler, useForm } from "react-hook-form";
import FormRow from "../../../Layout/FormRow";
import Input from "../../../Form/Input";
import Button from "../../../Button";
import Form from "../../../Layout/Form";
import { ActionRow } from "../../../Layout/Layout";
import useProfilStore from "../../../../lib/Profil/store";
import { shallow } from "zustand/shallow";
import SalutationSelect from "../../../Form/SalutationSelect";
import styled from "@emotion/styled";
import { Color } from "../../../Button/BackgroundColor";

const StyledForm = styled(Form)`
  width: 100%;
  container-type: inline-size;
  container-name: formContainer;
`;

export interface iProfileInputs {
  salutation: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

interface iProfileForm {
  user: iUser;
}
const ProfileForm = ({ user }: iProfileForm) => {
  const [loading, updateProfile] = useProfilStore(
    (state) => [state.loading, state.updateProfile],
    shallow
  );

  const { handleSubmit, control, setError, watch, formState } =
    useForm<iProfileInputs>({
      defaultValues: {
        salutation: user.salutation,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        password: "",
        passwordRepeat: "",
      },
      mode: "onSubmit",
    });

  const watchPassword = watch("password");

  const onSubmit: SubmitHandler<iProfileInputs> = (data) => {
    updateProfile(data, setError);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <SalutationSelect
          placeholder="Anrede"
          name="salutation"
          rules={{
            required: true,
          }}
          control={control}
        />
      </FormRow>
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
          placeholder="E-Mail"
          name="email"
          rules={{
            required: true,
            maxLength: 50,
          }}
          control={control}
        />
      </FormRow>
      <FormRow>
        <Input
          fullWidth
          placeholder="Passwort"
          name="password"
          type="password"
          rules={{
            required: false,
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
            required: !!watchPassword,
            maxLength: 20,
          }}
          control={control}
        />
      </FormRow>
      <ActionRow>
        <Button
          disabled={!formState.isDirty}
          type="submit"
          color={Color.success}
          isLoading={loading}
        >
          Speichern
        </Button>
      </ActionRow>
    </StyledForm>
  );
};

export default ProfileForm;
