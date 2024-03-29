import React, { useEffect, useState } from "react";
import Head from "next/head";
import tw from "twin.macro";
import useUserStore from "../../../../lib/Management/User/store";
import { shallow } from "zustand/shallow";
import iUser from "../../../../Interfaces/iUser";
import Button, { Link } from "../../../../components/Button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../../../components/Form/Input";
import CountrySelect from "../../../../components/Form/CountrySelect";
import SalutationSelect from "../../../../components/Form/SalutationSelect";
import FormRow from "../../../../components/Layout/FormRow";
import Form from "../../../../components/Layout/Form";
import { Color } from "../../../../components/Button/BackgroundColor";
import { ActionRow } from "../../../../components/Layout/Layout";

const Container = tw.div`
    pt-small
    mb-base
    mx-small
`;

const HeadlineRow = tw.div`
    flex
    justify-between
    items-center
`;

export type iUserEditForm = {
  userId: number;
  salutation: string;
  firstName: string;
  lastName: string;
  street: string;
  postcode: string;
  city: string;
  country: string;
  birthday: string;
  email: string;
  phone: string;
  wantsEmailNotification: boolean;
  isActive: boolean;
  levelId: number;
  password: string;
  passwordRepeat: string;
  bankAccountBic: string;
  bankAccountIban: string;
  bankAccountFirstName: string;
  bankAccountLastName: string;
  bankAccountStreet: string;
  bankAccountPostcode: string;
  bankAccountCity: string;
  bankAccountCountry: string;
};

const Users = ({ id }: { id: number }) => {
  const [user, setUser] = useState<iUser | null>(null);

  const [loading, getUser, updateUser] = useUserStore(
    (state) => [state.loading, state.getUser, state.updateUser],
    shallow
  );

  const loadUser = async () => {
    const userResponse = await getUser(id);
    setUser(userResponse);
  };

  useEffect(() => {
    if (!loading) {
      loadUser();
    }
  }, []);

  const { handleSubmit, control, reset, setError } = useForm<iUserEditForm>({
    defaultValues: {
      userId: user?.id,
      salutation: user?.salutation,
      firstName: user?.firstName,
      lastName: user?.lastName,
      street: user?.street,
      postcode: user?.postcode,
      city: user?.city,
      country: "",
      birthday: user?.birthday,
      email: user?.email,
      phone: user?.phone,
      wantsEmailNotification: user?.wantsEmailNotification,
      isActive: user?.isActive,
      levelId: user?.levelId,
      password: "",
      passwordRepeat: "",
      bankAccountBic: user?.bankAccount.bic,
      bankAccountIban: user?.bankAccount.iban,
      bankAccountFirstName: user?.bankAccount.firstName,
      bankAccountLastName: user?.bankAccount.lastName,
      bankAccountStreet: user?.bankAccount.street,
      bankAccountPostcode: user?.bankAccount.postcode,
      bankAccountCity: user?.bankAccount.city,
      bankAccountCountry: user?.bankAccount.country.name,
    },
    mode: "onSubmit",
  });
  useEffect(() => {
    if (user) {
      reset({
        userId: user.id,
        salutation: user?.salutation,
        firstName: user.firstName,
        lastName: user.lastName,
        street: user.street,
        postcode: user.postcode,
        city: user.city,
        country: user.country.name,
        birthday: user.birthday,
        email: user.email,
        phone: user.phone,
        wantsEmailNotification: user.wantsEmailNotification,
        isActive: user.isActive,
        levelId: user.levelId,
        password: "",
        passwordRepeat: "",
        bankAccountBic: user.bankAccount.bic,
        bankAccountIban: user.bankAccount.iban,
        bankAccountFirstName: user.bankAccount.firstName,
        bankAccountLastName: user.bankAccount.lastName,
        bankAccountStreet: user.bankAccount.street,
        bankAccountPostcode: user.bankAccount.postcode,
        bankAccountCity: user.bankAccount.city,
        bankAccountCountry: user.bankAccount.country.name,
      });
    }
  }, [user]);

  const onSubmit: SubmitHandler<iUserEditForm> = async (data) => {
    const userResponse = user && (await updateUser(data, setError));
    userResponse?.user && setUser(userResponse.user);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <>
      <Head>
        <title>
          Bearbeiten von: {user ? user.fullName : "Loading..."}{" "}
          Benutzerverwaltung | Alles im Rudel e.V.
        </title>
        <meta
          name="description"
          content="Alles im Rudel ist ein Verein in Elmshorn, der 2021 gegründet wurde und mehrere Sparten hat, wie z.B. Airsoft oder E-Sports"
        />
      </Head>
      <Container>
        {user ? (
          <>
            <HeadlineRow>
              Bearbeiten von: {user.fullName}
              <Link color={Color.secondary} href="/management/users">
                <FontAwesomeIcon icon={faArrowLeft} /> Zurück zur
                Benutzerübersicht
              </Link>
            </HeadlineRow>
            <HeadlineRow>Benutzerdaten</HeadlineRow>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormRow>
                <SalutationSelect
                  fullWidth
                  name="salutation"
                  placeholder="Anrede"
                  rules={{
                    required: true,
                  }}
                  control={control}
                />
                <Input
                  fullWidth
                  placeholder="Vorname"
                  name="firstName"
                  rules={{
                    required: true,
                    maxLength: 30,
                  }}
                  control={control}
                />
                <Input
                  fullWidth
                  placeholder="Nachname"
                  name="lastName"
                  rules={{
                    required: true,
                    maxLength: 30,
                  }}
                  control={control}
                />
                <Input
                  fullWidth
                  placeholder="Straße"
                  name="street"
                  rules={{
                    required: true,
                    maxLength: 30,
                  }}
                  control={control}
                />
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
                    maxLength: 30,
                  }}
                  control={control}
                />
                <CountrySelect
                  fullWidth
                  name="country"
                  placeholder="Land auswählen"
                  rules={{
                    required: true,
                  }}
                  control={control}
                />
              </FormRow>
              <FormRow>
                <Input
                  placeholder="Geburstag"
                  name="birthday"
                  rules={{
                    required: true,
                    maxLength: 30,
                  }}
                  control={control}
                />
                <Input
                  placeholder="E-Mail"
                  name="email"
                  rules={{
                    required: true,
                    maxLength: 30,
                  }}
                  control={control}
                />
                <Input
                  placeholder="Telefon"
                  name="phone"
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
                    required: false,
                    maxLength: 20,
                  }}
                  control={control}
                />
              </FormRow>
              <HeadlineRow>Bankdaten</HeadlineRow>
              <FormRow>
                <Input
                  fullWidth
                  placeholder="IBAN"
                  name="bankAccountIban"
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
                  name="bankAccountBic"
                  mask=""
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
                  placeholder="Vorname"
                  name="bankAccountFirstName"
                  rules={{
                    required: true,
                    maxLength: 20,
                  }}
                  control={control}
                />
                <Input
                  fullWidth
                  placeholder="Nachname"
                  name="bankAccountLastName"
                  rules={{
                    required: true,
                    maxLength: 20,
                  }}
                  control={control}
                />
                <Input
                  fullWidth
                  placeholder="Straße & Hausnummer"
                  name="bankAccountStreet"
                  rules={{
                    required: true,
                    maxLength: 20,
                  }}
                  control={control}
                />
                <Input
                  fullWidth
                  placeholder="Postleitzahl"
                  name="bankAccountPostcode"
                  rules={{
                    required: true,
                    maxLength: 5,
                  }}
                  control={control}
                />
                <Input
                  fullWidth
                  placeholder="Stadt"
                  name="bankAccountCity"
                  rules={{
                    required: true,
                    maxLength: 30,
                  }}
                  control={control}
                />
                <CountrySelect
                  fullWidth
                  placeholder="Land"
                  name="bankAccountCountry"
                  rules={{
                    required: true,
                    maxLength: 30,
                  }}
                  control={control}
                />
              </FormRow>
              <ActionRow>
                <Button
                  type="button"
                  isLoading={loading}
                  color={Color.secondary}
                  onClick={handleReset}
                >
                  Zurücksetzen
                </Button>
                <Button type="submit" isLoading={loading} color={Color.success}>
                  Speichern
                </Button>
              </ActionRow>
            </Form>
          </>
        ) : (
          <>Loading...</>
        )}
      </Container>
    </>
  );
};

export async function getServerSideProps({ params }: any) {
  return {
    props: {
      protected: true,
      permission: "users.edit",
      id: params.id,
    },
  };
}

export default Users;
