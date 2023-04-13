import React, { useEffect, useState } from "react";
import useAuthStore from "../../../lib/Auth/store";
import useUserStore from "../../../lib/Management/User/store";
import { shallow } from "zustand/shallow";
import Portal from "../../Layout/Portal";
import iUser from "../../../Interfaces/iUser";
import Card, { CardHeadline, CardText } from "../../Layout/Card";
import { Li, List } from "../../Layout/Ul";
import Layout, { Col } from "../../Layout/Layout";
import { date, dateTimeSek } from "../../../lib/dates";
import { showBoolean } from "../../../lib/boolean";
import BranchCard from "../Branch/BranchCard";
import { Link } from "../../Button";

interface iShowUserModal {
  isActive: boolean;
  userId: number;
  onClose: () => void;
}

const ShowUserModal = ({ isActive, onClose, userId }: iShowUserModal) => {
  const [can] = useAuthStore((state) => [state.can], shallow);
  const [loading, getUser] = useUserStore(
    (state) => [state.loading, state.getUser],
    shallow
  );
  const [user, setUser] = useState<iUser | null>(null);

  const loadUser = async () => {
    const userResponse = await getUser(userId);
    setUser(userResponse);
  };

  useEffect(() => {
    if (!loading) {
      loadUser();
    }
  }, []);

  return (
    <>
      {can("users.show") && isActive && (
        <Portal
          isActive={isActive}
          onClose={onClose}
          headline={`Benutzer: ${user?.fullName ?? "Loading..."}`}
          actionRow={
            <Link href={"/management/users/edit/" + userId}>
              Benutzer bearbeiten
            </Link>
          }
        >
          {user ? (
            <Layout>
              <Col>
                <Card>
                  <CardHeadline>Benutzerdaten</CardHeadline>
                  <CardText>
                    <Layout>
                      <Col>
                        <img
                          src={user.thumbnail?.thumbnail}
                          alt={user.fullName}
                        />
                      </Col>
                      <Col>
                        <List>
                          <Li> {user.fullName}</Li>
                          <Li>{user.street}</Li>
                          <Li>{user.city}</Li>
                          <Li>{user.country.name}</Li>
                        </List>
                        <List>
                          <Li>{date(user.birthday)}</Li>
                          <Li>{user.age} Jahre alt</Li>
                        </List>
                        <List>
                          <Li>{user.phone}</Li>
                          <Li>{user.email}</Li>
                          <Li>
                            Möchte E-Mail Benachrichtigungen:{" "}
                            {showBoolean(user.wantsEmailNotification)}
                          </Li>
                          <Li>
                            E-Mail bestätigt am:{" "}
                            {dateTimeSek(user.emailVerifiedAt)}
                          </Li>
                        </List>
                        <List>
                          <Li>Erstellt am: {dateTimeSek(user.createdAt)}</Li>
                          <Li>Aktiviert am: {dateTimeSek(user.activatedAt)}</Li>
                          <Li>
                            Zuletzt bearbeitet: {dateTimeSek(user.updatedAt)}
                          </Li>
                        </List>
                      </Col>
                    </Layout>
                  </CardText>
                </Card>
              </Col>
              <Col>
                <Card>
                  <CardHeadline>Bankdaten</CardHeadline>
                  <CardText>
                    <Layout>
                      <Col>
                        <List>
                          <Li>{user.bankAccount.fullName}</Li>
                          <Li>{user.bankAccount.street}</Li>
                          <Li>{user.bankAccount.city}</Li>
                          <Li>{user.bankAccount.country.name}</Li>
                        </List>
                        <List>
                          <Li>{user.bankAccount.iban}</Li>
                          <Li>{user.bankAccount.bic}</Li>
                        </List>
                        <List>
                          <Li>
                            Erstellt am:{" "}
                            {dateTimeSek(user.bankAccount.createdAt)}
                          </Li>
                          <Li>
                            Zuletzt bearbeitet:{" "}
                            {dateTimeSek(user.bankAccount.updatedAt)}
                          </Li>
                        </List>
                      </Col>
                      <Col>
                        <img
                          src={user.bankAccount.signature.image}
                          alt={user.bankAccount.fullName}
                        />
                      </Col>
                    </Layout>
                  </CardText>
                </Card>
                <Card>
                  <CardHeadline>Sparten</CardHeadline>
                  <CardText>
                    <Layout>
                      {user.branchUserMemberShips.map((branch) => {
                        return <BranchCard key={branch.id} branch={branch} />;
                      })}
                    </Layout>
                  </CardText>
                </Card>
              </Col>
            </Layout>
          ) : (
            <div>Loading....</div>
          )}
        </Portal>
      )}
    </>
  );
};

export default ShowUserModal;
