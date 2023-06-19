import React from "react";
import useAuthStore from "../../../lib/Auth/store";
import useBranchMembersStore from "../../../lib/Management/BranchMembers/store";
import { shallow } from "zustand/shallow";
import Portal from "../../Layout/Portal";
import Card, { CardHeadline, CardText } from "../../Layout/Card";
import { Li, List } from "../../Layout/Ul";
import Layout, { Col } from "../../Layout/Layout";
import { date } from "../../../lib/dates";
import iBranchUserMemberShip from "../../../Interfaces/iBranchUserMemberShip";
import iUser from "../../../Interfaces/iUser";
import Button from "../../Button";
import { Color } from "../../Button/BackgroundColor";

interface iAcceptNewBranchMembersModal {
  isActive: boolean;
  branchUserMemberShip: iBranchUserMemberShip;
  user: iUser;
  onClose: () => void;
}

const AcceptNewBranchMembersModal = ({
  isActive,
  branchUserMemberShip,
  user,
  onClose,
}: iAcceptNewBranchMembersModal) => {
  const [can] = useAuthStore((state) => [state.can], shallow);
  const [loading, reject, accept] = useBranchMembersStore(
    (state) => [state.loading, state.reject, state.accept],
    shallow
  );

  return (
    <>
      {can("users.show") && isActive && (
        <Portal
          isActive={isActive}
          onClose={onClose}
          headline={`Neuanmeldung von: ${user.fullName} bestätigen`}
          isFullPage={false}
          actionRow={
            <>
              <Button
                onClick={() => {
                  reject(branchUserMemberShip.id);
                  onClose();
                }}
                color={Color.error}
              >
                Ablehnen
              </Button>
              <Button
                onClick={() => {
                  accept(branchUserMemberShip.id);
                  onClose();
                }}
                color={Color.success}
              >
                Bestätigen
              </Button>
            </>
          }
        >
          <Layout>
            <Col>
              <Card>
                <CardHeadline>Benutzerdaten</CardHeadline>
                <CardText>
                  <Layout>
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
                      </List>
                    </Col>
                  </Layout>
                </CardText>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardHeadline>Sparte</CardHeadline>
                <CardText>
                  <Layout>
                    <Col>
                      <List>
                        <Li> {branchUserMemberShip.branch.name}</Li>
                      </List>
                    </Col>
                  </Layout>
                </CardText>
              </Card>
            </Col>
          </Layout>
        </Portal>
      )}
    </>
  );
};

export default AcceptNewBranchMembersModal;
