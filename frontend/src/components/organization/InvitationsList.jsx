import React from "react";
import { Alert, Row, Col, ButtonGroup } from "reactstrap";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import useTitle from "react-use/lib/useTitle";

import {
  ContentSection,
  IconButton,
  DateHoverable,
  useAxiosComponentLoader,
} from "@certego/certego-ui";

import { InvitationStatusBadge } from "./utils/InvitationStatusBadge";
import {
  BASE_URI_INVITATION,
  acceptInvitation,
  declineInvitation,
} from "./orgApi";
import { INTELOWL_DOCS_URL } from "../../constants/environment";

export default function InvitationsList() {
  console.debug("InvitationsList rendered!");

  // API
  const [invitations, Loader, refetchInvs] = useAxiosComponentLoader(
    {
      url: BASE_URI_INVITATION,
    },
    (respData) =>
      respData.sort(
        (currentInvitation, nextInvitation) =>
          currentInvitation.created_at - nextInvitation.created_at,
      ),
  );

  // page title
  useTitle(`IntelOwl | 邀请 (${invitations?.length || 0}) `, {
    restoreOnUnmount: true,
  });

  // callback
  const actionDispatch = React.useCallback(
    async (operation, invId, orgName) => {
      switch (operation) {
        case "accept":
          await acceptInvitation(invId, orgName);
          setTimeout(refetchInvs, 100);
          break;
        case "decline":
          await declineInvitation(invId, orgName);
          setTimeout(refetchInvs, 100);
          break;
        default:
          break;
      }
    },
    [refetchInvs],
  );

  return (
    <>
      {/* Alert */}
      <Row className="mb-2">
        <Alert color="secondary" className="mx-auto">
          <span>
            加入一个组织有很多好处.&nbsp;
            <a
              href={`${INTELOWL_DOCS_URL}Advanced-Usage.html#organizations-and-user-management`}
              target="_blank"
              rel="noreferrer"
              className="link-primary"
            >
              了解更多
            </a>
            .
          </span>
        </Alert>
      </Row>
      <h6>邀请列表</h6>
      {/* List */}
      <ContentSection className="bg-body border border-dark">
        <Loader
          render={() =>
            invitations?.length ? (
              <ol>
                {invitations.map(
                  ({ id, organization, status, created_at: invitedAt }) => (
                    <li key={`invlist-${id}`}>
                      <Row className="mb-3">
                        <Col sm={6} xl={2}>
                          <small className="text-muted me-1">
                            组织
                          </small>
                          &nbsp;
                          {organization?.name}
                        </Col>
                        <Col sm={6} xl={2}>
                          <small className="text-muted me-1">邀请人</small>
                          &nbsp;
                          {organization?.owner?.username}
                        </Col>
                        <Col sm={6} xl={2}>
                          <small className="text-muted me-1">
                            成员数
                          </small>
                          &nbsp;
                          {organization?.members_count}
                        </Col>
                        <Col sm={6} xl={2}>
                          <small className="text-muted me-1">已收到</small>
                          <DateHoverable
                            id={`invlist-${id}`}
                            value={invitedAt}
                            format="hh:mm a MMM do, yyyy"
                            title="邀请发送日期"
                          />
                        </Col>
                        <Col sm={6} xl={2}>
                          <InvitationStatusBadge status={status} />
                        </Col>
                        {/* Actions */}
                        <Col sm={6} xl={2}>
                          {status === "pending" && (
                            <ButtonGroup>
                              <IconButton
                                id={`accept-invite-btn-${id}`}
                                className="text-success bg-body border border-dark"
                                Icon={IoMdCheckmark}
                                title="接受邀请"
                                onClick={() =>
                                  actionDispatch(
                                    "accept",
                                    id,
                                    organization?.name,
                                  )
                                }
                              />
                              <IconButton
                                id={`decline-invite-btn-${id}`}
                                className="text-danger bg-body border border-dark"
                                Icon={IoMdClose}
                                title="拒绝邀请"
                                onClick={() =>
                                  actionDispatch(
                                    "decline",
                                    id,
                                    organization?.name,
                                  )
                                }
                              />
                            </ButtonGroup>
                          )}
                        </Col>
                      </Row>
                    </li>
                  ),
                )}
              </ol>
            ) : (
              <h6 className="text-center text-muted">没有待处理邀请</h6>
            )
          }
        />
      </ContentSection>
    </>
  );
}
