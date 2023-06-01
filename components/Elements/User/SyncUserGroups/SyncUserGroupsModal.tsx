import React, { useEffect, useMemo, useState } from "react";
import useAuthStore from "../../../../lib/Auth/store";
import useUserStore from "../../../../lib/Management/User/store";
import { shallow } from "zustand/shallow";
import Portal from "../../../Layout/Portal";
import iUser from "../../../../Interfaces/iUser";
import Layout, { ActionRow, Col } from "../../../Layout/Layout";
import { api } from "../../../../lib/axios";
import iUserGroup from "../../../../Interfaces/iUserGroup";
import ColumnRow from "../../../Layout/Table/ColumnRow";
import Button, { TextButton } from "../../../Button";
import { Color } from "../../../Button/BackgroundColor";
import { checkArrays } from "../../../../lib/checkArrayDifferenz";
import UserGroupTable from "../../UserGroup/UserGroupTable";
import toast from "react-hot-toast";
import { handleBackendError } from "../../../../lib/errorHelper";

interface iSyncUserGroupsModal {
  isActive: boolean;
  userId: number;
  onClose: () => void;
}

const SyncUserGroupsModal = ({
  isActive,
  onClose,
  userId,
}: iSyncUserGroupsModal) => {
  const [can] = useAuthStore((state) => [state.can], shallow);
  const [loading, getUser] = useUserStore(
    (state) => [state.loading, state.getUser],
    shallow
  );
  const [user, setUser] = useState<iUser | null>(null);
  const [userUserGroups, setUserUserGroups] = useState<iUserGroup[] | []>([]);
  const [baseUserGroups, setBaseUserGroups] = useState<iUserGroup[] | []>([]);
  const [userGroups, setUserGroups] = useState<iUserGroup[] | []>([]);
  const [saving, setSaving] = useState<boolean>(false);

  const loadUser = async () => {
    const userResponse = await getUser(userId);
    setUser(userResponse);
    setUserUserGroups(userResponse.userGroups);
  };

  useEffect(() => {
    if (!loading) {
      loadUser();
    }
  }, []);

  const loadUserGroups = () => {
    const params = {
      withOutUserGroupIds: user?.userGroups.map((userGroup) => userGroup.id),
    };

    api(`/api/user-groups/all`, { params: params }).then((response) => {
      setBaseUserGroups(response.data.data);
      setUserGroups(response.data.data);
    });
  };

  useEffect(() => {
    loadUserGroups();
  }, [user]);

  const remove = (toRemoveUserGroup: iUserGroup) => {
    setUserUserGroups((currentUserGroups) => {
      return (currentUserGroups = currentUserGroups.filter(
        (userGroup) => userGroup.id !== toRemoveUserGroup.id
      ));
    });
    setUserGroups((currentUserGroups) => {
      return [...currentUserGroups, toRemoveUserGroup];
    });
  };

  const add = (userGroupToAdd: iUserGroup) => {
    setUserGroups((currentUserGroups) => {
      return (currentUserGroups = currentUserGroups.filter(
        (userGroup) => userGroup.id !== userGroupToAdd.id
      ));
    });
    setUserUserGroups((currentUserGroups) => {
      return [...currentUserGroups, userGroupToAdd];
    });
  };

  const reset = () => {
    if (user) {
      setUserUserGroups(user.userGroups);
    }
    setUserGroups(baseUserGroups);
  };

  const submit = () => {
    setSaving(true);
    api
      .put(`/api/users/sync-user-groups/${userId}`, {
        userId: userId,
        userGroupIds: userUserGroups.map((userGroup) => userGroup.id),
      })
      .then((response) => {
        toast.success(response.data?.message, { position: "bottom-right" });
        loadUser();
        setSaving(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message, { position: "bottom-right" });
        setSaving(false);
      });
  };

  const hasChanges = useMemo(() => {
    if (!user) return false;
    return checkArrays(user.userGroups, userUserGroups);
  }, [userUserGroups, user]);

  const selectedTableHeaders = [
    {
      text: "Name",
      value: "displayName",
    },
    {
      text: "Aktionen",
      value: "actions",
      sortable: false,
      transform: (item: any) => (
        <ColumnRow>
          <TextButton onClick={() => remove(item)}>Löschen</TextButton>
        </ColumnRow>
      ),
    },
  ];

  const notSelectedTableHeaders = [
    {
      text: "Name",
      value: "displayName",
    },
    {
      text: "Aktionen",
      value: "actions",
      sortable: false,
      transform: (item: any) => (
        <ColumnRow>
          <TextButton onClick={() => add(item)}>Hinzufügen</TextButton>
        </ColumnRow>
      ),
    },
  ];

  return (
    <>
      {can("user_groups.user.sync") && isActive && (
        <Portal
          isActive={isActive}
          onClose={onClose}
          headline={`Benutzergruppen dem Benutzer: ${
            user?.fullName ?? "Loading..."
          } hinzufügen`}
        >
          {user ? (
            <>
              <Layout>
                <Col>
                  <UserGroupTable
                    headers={selectedTableHeaders}
                    data={userUserGroups}
                  />
                </Col>
                <Col>
                  <UserGroupTable
                    headers={notSelectedTableHeaders}
                    data={userGroups}
                  />
                </Col>
              </Layout>
              <ActionRow>
                <Button
                  disabled={!hasChanges}
                  color={Color.secondary}
                  isLoading={saving}
                  onClick={reset}
                >
                  Zurücksetzen
                </Button>
                <Button
                  disabled={!hasChanges}
                  color={Color.success}
                  isLoading={saving}
                  onClick={submit}
                >
                  Speichern
                </Button>
              </ActionRow>
            </>
          ) : (
            <div>Loading....</div>
          )}
        </Portal>
      )}
    </>
  );
};

export default SyncUserGroupsModal;
