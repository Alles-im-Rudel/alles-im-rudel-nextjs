import React, { useEffect, useMemo, useState } from "react";
import useAuthStore from "../../../../lib/Auth/store";
import usePermissionStore from "../../../../lib/Management/Permission/store";
import { shallow } from "zustand/shallow";
import Portal from "../../../Layout/Portal";
import Layout, { ActionRow, Col } from "../../../Layout/Layout";
import iPermission from "../../../../Interfaces/iPermission";
import { iHeader } from "../../../Layout/Table/Table";
import ColumnRow from "../../../Layout/Table/ColumnRow";
import Button, { TextButton } from "../../../Button";
import { Color } from "../../../Button/BackgroundColor";
import { checkArrays } from "../../../../lib/checkArrayDifferenz";
import PermissionTable from "../../Permission/PermissionTable";
import iUserGroup from "../../../../Interfaces/iUserGroup";

interface iSyncPermissionsModal {
  isActive: boolean;
  userGroupId: number;
  onClose: () => void;
}

const SyncPermissionsModal = ({
  isActive,
  onClose,
  userGroupId,
}: iSyncPermissionsModal) => {
  const [can] = useAuthStore((state) => [state.can], shallow);
  const [loading, getUserGroup, getPermissions] = usePermissionStore(
    (state) => [state.loading, state.getUserGroup, state.getPermissions],
    shallow
  );
  const [userGroup, setUserGroup] = useState<iUserGroup | null>(null);
  const [userGroupPermissions, setUserGroupPermissions] = useState<
    iPermission[] | []
  >([]);
  const [basePermissions, setBasePermissions] = useState<iPermission[] | []>(
    []
  );
  const [permissions, setPermissions] = useState<iPermission[] | []>([]);

  const loadUserGroup = async () => {
    const userGroupResponse = await getUserGroup(userGroupId);
    setUserGroup(userGroupResponse);
    setUserGroupPermissions(userGroupResponse.permissions);
  };

  useEffect(() => {
    if (!loading) {
      loadUserGroup();
    }
  }, []);

  const loadPermissions = async () => {
    const permissionIds = userGroup?.permissions.map(
      (permission) => permission.id
    );
    const permissionsResponse = await getPermissions(permissionIds);
    setBasePermissions(permissionsResponse);
    setPermissions(permissionsResponse);
  };

  useEffect(() => {
    loadPermissions();
  }, [userGroup]);

  const remove = (toRemovePermission: iPermission) => {
    setUserGroupPermissions((currentPermission) => {
      return (currentPermission = currentPermission.filter(
        (permission) => permission.id !== toRemovePermission.id
      ));
    });
    setPermissions((currenPermission) => {
      return [...currenPermission, toRemovePermission];
    });
  };

  const add = (toAddPermission: iPermission) => {
    setPermissions((currentPermission) => {
      return (currentPermission = currentPermission.filter(
        (permission) => permission.id !== toAddPermission.id
      ));
    });
    setUserGroupPermissions((currentPermission) => {
      return [...currentPermission, toAddPermission];
    });
  };

  const reset = () => {
    if (userGroup) {
      setUserGroupPermissions(userGroup.permissions);
    }
    setPermissions(basePermissions);
  };

  const submit = () => {
    console.log(userGroupPermissions);
  };

  const hasChanges = useMemo(() => {
    if (!userGroup) return false;
    return checkArrays(userGroup.permissions, userGroupPermissions);
  }, [userGroupPermissions, userGroup]);

  const selectedTableHeaders: iHeader[] = [
    {
      text: "Name",
      value: "name",
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
      value: "name",
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
          headline={`Berechtigungen dem Benutzer: ${
            userGroup?.displayName ?? "Loading..."
          } hinzufügen`}
        >
          {userGroup ? (
            <>
              <Layout>
                <Col>
                  <PermissionTable
                    headers={selectedTableHeaders}
                    data={userGroupPermissions}
                  />
                </Col>
                <Col>
                  <PermissionTable
                    headers={notSelectedTableHeaders}
                    data={permissions}
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

export default SyncPermissionsModal;
