import React, { useEffect, useMemo, useState } from "react";
import useAuthStore from "../../../../lib/Auth/store";
import useUserStore from "../../../../lib/Management/User/store";
import { shallow } from "zustand/shallow";
import Portal from "../../../Layout/Portal";
import iUser from "../../../../Interfaces/iUser";
import Layout, { ActionRow, Col } from "../../../Layout/Layout";
import { api } from "../../../../lib/axios";
import iPermission from "../../../../Interfaces/iPermission";
import { iHeader } from "../../../Layout/Table/Table";
import ColumnRow from "../../../Layout/Table/ColumnRow";
import Button, { TextButton } from "../../../Button";
import { Color } from "../../../Button/BackgroundColor";
import { checkArrays } from "../../../../lib/checkArrayDifferenz";
import PermissionTable from "../../Permission/PermissionTable";
import toast from "react-hot-toast";

interface iSyncPermissionsModal {
  isActive: boolean;
  userId: number;
  onClose: () => void;
}

const SyncPermissionsModal = ({
  isActive,
  onClose,
  userId,
}: iSyncPermissionsModal) => {
  const [can] = useAuthStore((state) => [state.can], shallow);
  const [loading, getUser] = useUserStore(
    (state) => [state.loading, state.getUser],
    shallow
  );
  const [user, setUser] = useState<iUser | null>(null);
  const [userPermissions, setUserPermissions] = useState<iPermission[] | []>(
    []
  );
  const [basePermissions, setBasePermissions] = useState<iPermission[] | []>(
    []
  );
  const [permissions, setPermissions] = useState<iPermission[] | []>([]);
  const [saving, setSaving] = useState<boolean>(false);
  const loadUser = async () => {
    const userResponse = await getUser(userId);
    setUser(userResponse);
    setUserPermissions(userResponse.permissions);
  };

  useEffect(() => {
    if (!loading) {
      loadUser();
    }
  }, []);

  const loadPermissions = () => {
    const params = {
      withOutPermissionIds: user?.permissions.map(
        (permissions) => permissions.id
      ),
    };

    api(`/api/permissions`, { params: params }).then((response) => {
      setBasePermissions(response.data.data);
      setPermissions(response.data.data);
    });
  };

  useEffect(() => {
    loadPermissions();
  }, [user]);

  const remove = (toRemovePermission: iPermission) => {
    setUserPermissions((currentPermission) => {
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
        (userGroup) => userGroup.id !== toAddPermission.id
      ));
    });
    setUserPermissions((currentPermission) => {
      return [...currentPermission, toAddPermission];
    });
  };

  const reset = () => {
    if (user) {
      setUserPermissions(user.permissions);
    }
    setPermissions(basePermissions);
  };

  const submit = () => {
    setSaving(true);
    api
      .put(`/api/users/sync-permissions/${userId}`, {
        userId: userId,
        permissionIds: userPermissions.map((permissions) => permissions.id),
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
    return checkArrays(user.permissions, userPermissions);
  }, [userPermissions, user]);

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
            user?.fullName ?? "Loading..."
          } hinzufügen`}
        >
          {user ? (
            <>
              <Layout>
                <Col>
                  <PermissionTable
                    headers={selectedTableHeaders}
                    data={userPermissions}
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
                  isLoading={saving}
                  color={Color.secondary}
                  onClick={reset}
                >
                  Zurücksetzen
                </Button>
                <Button
                  disabled={!hasChanges}
                  isLoading={saving}
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
