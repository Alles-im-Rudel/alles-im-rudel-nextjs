import React from "react";
import useAuthStore from "../../../../lib/Auth/store";
import useUserGroupStore from "../../../../lib/Management/Permission/store";
import { shallow } from "zustand/shallow";
import Portal from "../../../Layout/Portal";
import iUserGroup from "../../../../Interfaces/iUserGroup";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../../Form/Input";
import Form from "../../../Layout/Form";
import FormRow from "../../../Layout/FormRow";
import LevelSelect from "../../../Form/LevelSelect";
import Button from "../../../Button";
import { Color } from "../../../Button/BackgroundColor";
import { ActionRow } from "../../../Layout/Layout";
import TextArea from "../../../Form/TextArea";

interface iEditUserGroupModal {
  isActive: boolean;
  userGroup: iUserGroup;
  onClose: () => void;
}

export type iUserGroupForm = {
  displayName: string;
  userGroupId: number;
  color: string;
  levelId: number;
  description: string;
};

const EditUserGroupModal = ({
  isActive,
  onClose,
  userGroup,
}: iEditUserGroupModal) => {
  const [can] = useAuthStore((state) => [state.can], shallow);
  const [updateUserGroup, loading] = useUserGroupStore(
    (state) => [state.updateUserGroup, state.loading],
    shallow
  );

  const { handleSubmit, control, reset, setError } = useForm<iUserGroupForm>({
    defaultValues: {
      userGroupId: userGroup.id,
      displayName: userGroup.displayName,
      color: userGroup.color,
      levelId: userGroup.levelId,
      description: userGroup.description,
    },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<iUserGroupForm> = (data) => {
    updateUserGroup(data, setError);
  };

  const onReset = () => {
    reset({
      displayName: userGroup.displayName,
      userGroupId: userGroup.id,
      color: userGroup.color,
      levelId: userGroup.levelId,
      description: userGroup.description,
    });
  };

  return (
    <>
      {can("user_groups.update") && isActive && (
        <Portal
          isActive={isActive}
          isFullPage={false}
          onClose={onClose}
          headline={`Benutzergruppe: ${
            userGroup?.displayName ?? "Loading..."
          } bearbeiten`}
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
              <Input
                fullWidth
                placeholder="Name"
                name="displayName"
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
                placeholder="Farbe"
                name="color"
                rules={{
                  required: true,
                  maxLength: 20,
                }}
                control={control}
              />
            </FormRow>
            <FormRow>
              <LevelSelect
                fullWidth
                name="levelId"
                placeholder="Level"
                rules={{
                  required: true,
                }}
                control={control}
              />
            </FormRow>
            <FormRow>
              <TextArea
                fullWidth
                placeholder="Beschreibung"
                name="description"
                rules={{
                  required: true,
                  maxLength: 500,
                }}
                control={control}
              />
            </FormRow>
            <ActionRow>
              <Button
                isLoading={loading}
                type="button"
                color={Color.secondary}
                onClick={onReset}
              >
                Zurücksetzen
              </Button>
              <Button isLoading={loading} color={Color.success}>
                Speichern
              </Button>
            </ActionRow>
          </Form>
        </Portal>
      )}
    </>
  );
};

export default EditUserGroupModal;
