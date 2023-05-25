import React, { useEffect, useMemo, useState } from "react";
import useAuthStore from "../../../../lib/Auth/store";
import usePermissionStore from "../../../../lib/Management/Permission/store";
import useUserStore from "../../../../lib/Management/User/store";
import { shallow } from "zustand/shallow";
import Portal from "../../../Layout/Portal";
import Layout, { ActionRow, Col } from "../../../Layout/Layout";
import { iHeader } from "../../../Layout/Table/Table";
import ColumnRow from "../../../Layout/Table/ColumnRow";
import Button, { TextButton } from "../../../Button";
import { Color } from "../../../Button/BackgroundColor";
import { checkArrays } from "../../../../lib/checkArrayDifferenz";
import PermissionTable from "../../Permission/PermissionTable";
import iUserGroup from "../../../../Interfaces/iUserGroup";
import iUser from "../../../../Interfaces/iUser";

interface iSyncUsersModal {
  isActive: boolean;
  userGroupId: number;
  onClose: () => void;
}

const SyncUsersModal = ({
  isActive,
  onClose,
  userGroupId,
}: iSyncUsersModal) => {
  const [can] = useAuthStore((state) => [state.can], shallow);
  const [loading, getUserGroup] = usePermissionStore(
    (state) => [state.loading, state.getUserGroup],
    shallow
  );
  const [getUsers] = useUserStore((state) => [state.getAllUsers], shallow);
  const [userGroup, setUserGroup] = useState<iUserGroup | null>(null);
  const [userGroupUsers, setUserGroupUsers] = useState<iUser[] | []>([]);
  const [baseUsers, setBaseUsers] = useState<iUser[] | []>([]);
  const [users, setUsers] = useState<iUser[] | []>([]);

  const loadUserGroup = async () => {
    const userGroupResponse = await getUserGroup(userGroupId);
    setUserGroup(userGroupResponse);
    setUserGroupUsers(userGroupResponse.users);
  };

  useEffect(() => {
    if (!loading) {
      loadUserGroup();
    }
  }, []);

  const loadUsers = async () => {
    const usersIds = userGroup?.users.map((user) => user.id);
    const usersResponse = await getUsers(usersIds);
    setBaseUsers(usersResponse);
    setUsers(usersResponse);
  };

  useEffect(() => {
    loadUsers();
  }, [userGroup]);

  const remove = (toRemoveUser: iUser) => {
    setUserGroupUsers((currentUsers) => {
      return (currentUsers = currentUsers.filter(
        (user) => user.id !== toRemoveUser.id
      ));
    });
    setUsers((currentUsers) => {
      return [...currentUsers, toRemoveUser];
    });
  };

  const add = (toAddUser: iUser) => {
    setUsers((currentUsers) => {
      return (currentUsers = currentUsers.filter(
        (user) => user.id !== toAddUser.id
      ));
    });
    setUserGroupUsers((currentUsers) => {
      return [...currentUsers, toAddUser];
    });
  };

  const reset = () => {
    if (userGroup) {
      setUserGroupUsers(userGroup.users);
    }
    setUsers(baseUsers);
  };

  const submit = () => {
    console.log(userGroupUsers);
  };

  const hasChanges = useMemo(() => {
    if (!userGroup) return false;
    return checkArrays(userGroup.users, userGroupUsers);
  }, [userGroupUsers, userGroup]);

  const selectedTableHeaders: iHeader[] = [
    {
      text: "Name",
      value: "fullName",
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
      value: "fullName",
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
          headline={`Benutzer der Berechtigung ${
            userGroup?.displayName ?? "Loading..."
          } hinzufügen`}
        >
          {userGroup ? (
            <>
              <Layout>
                <Col>
                  <PermissionTable
                    headers={selectedTableHeaders}
                    data={userGroupUsers}
                  />
                </Col>
                <Col>
                  <PermissionTable
                    headers={notSelectedTableHeaders}
                    data={users}
                  />
                </Col>
              </Layout>
              <ActionRow>
                <Button
                  disabled={!hasChanges}
                  color={Color.secondary}
                  onClick={reset}
                >
                  Zurücksetzen
                </Button>
                <Button
                  disabled={!hasChanges}
                  color={Color.success}
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

export default SyncUsersModal;
