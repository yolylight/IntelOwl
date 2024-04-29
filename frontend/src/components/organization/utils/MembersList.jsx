import React from "react";
import { Row, Col, Fade, Badge } from "reactstrap";
import { FaUserFriends, FaUserMinus } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";

import { ContentSection, DateHoverable, confirm } from "@certego/certego-ui";

import { useOrganizationStore } from "../../../stores/useOrganizationStore";
import { useAuthStore } from "../../../stores/useAuthStore";
import {
  removeMemberFromOrg,
  leaveOrganization,
  promoteUserAdmin,
  removeUserAdmin,
} from "../orgApi";

export function MembersList() {
  // consume store
  const [user] = useAuthStore((state) => [state.user]);
  const {
    organization: { owner, name: orgName },
    members,
    membersCount,
    fetchAll,
    refetchMembers,
    isUserOwner,
    isUserAdmin,
  } = useOrganizationStore(
    React.useCallback(
      (state) => ({
        organization: state.organization,
        members: state.members,
        membersCount: state.membersCount,
        fetchAll: state.fetchAll,
        refetchMembers: state.refetchMembers,
        isUserOwner: state.isUserOwner,
        isUserAdmin: state.isUserAdmin,
      }),
      [],
    ),
  );

  // memo
  const sortedMembers = React.useMemo(
    () =>
      members?.length
        ? [...members].sort(
            (currentMember, nextMember) =>
              currentMember.joined - nextMember.joined,
          )
        : [],
    [members],
  );

  // callbacks
  const removeMemberCb = React.useCallback(
    async (username) => {
      const answer = await confirm({
        message: (
          <p>
            用户 <u>@{username}</u> 将被从您的组织中删除
            并将无法再访问您组织成员的 <b>规则</b> 和{" "}
            <b>提交内容</b>
            &nbsp;
            <br />
            <span className="text-warning">
              你确认要继续吗?
            </span>
          </p>
        ),
        confirmText: "是",
        confirmColor: "primary",
        cancelColor: "link text-gray",
      });
      if (answer) {
        await removeMemberFromOrg(username);
        setTimeout(refetchMembers, 100);
      }
    },
    [refetchMembers],
  );
  const leaveOrganizationCb = React.useCallback(async () => {
    const answer = await confirm({
      message: (
        <p>
          你将会从组织<u>{orgName}</u> 移除并且不能
          访问组织成员的 <b>规则</b> 和 <b>提交内容</b>
          <br />
          <span className="text-warning">
            你确定要继续吗?
          </span>
        </p>
      ),
      confirmText: "是",
      confirmColor: "primary",
      cancelColor: "link text-gray",
    });
    if (answer) {
      await leaveOrganization(orgName);
      setTimeout(fetchAll, 100);
    }
  }, [orgName, fetchAll]);
  const promoteUserAdminCb = React.useCallback(
    async (username) => {
      await promoteUserAdmin(username);
      setTimeout(fetchAll, 100);
    },
    [fetchAll],
  );
  const removeUserAdminCb = React.useCallback(
    async (username) => {
      await removeUserAdmin(username);
      setTimeout(fetchAll, 100);
    },
    [fetchAll],
  );

  // UI
  return (
    <Fade>
      <FaUserFriends size="16px" className="float-start text-secondary" />
      <ContentSection
        id="organization-members"
        className="bg-body border border-dark"
      >
        {/* Header */}
        <section className="h3 d-flex justify-content-between align-items-end flex-column flex-sm-row">
          <div>
            成员&nbsp;
            <small className="text-muted">共计 {membersCount}</small>
          </div>
        </section>
        <hr />
        {/* List */}
        <section>
          {sortedMembers?.length && (
            <ol>
              {sortedMembers.map(
                ({
                  username,
                  full_name: fullName,
                  joined,
                  is_admin: isAdmin,
                }) => (
                  <li
                    key={`memberlist-${username}`}
                    className="border-bottom border-dark py-1"
                  >
                    <Row>
                      <Col sm={5} title="名称和用户名">
                        {fullName}&nbsp;
                        <span
                          id={`memberlist-username-${username}`}
                          className="text-muted"
                        >
                          (@{username})
                        </span>
                      </Col>
                      <Col sm={3} title="加入日期">
                        <DateHoverable
                          value={joined}
                          format="do MMMM yyyy"
                          className="text-secondary user-select-none"
                        />
                      </Col>
                      <Col sm={2} className="text-end">
                        {owner?.username === username && (
                          <Badge
                            id={`memberlist-badge-owner-${username}`}
                            color="primary"
                          >
                            拥有者
                          </Badge>
                        )}
                        {owner?.username !== username && isAdmin && (
                          <Badge
                            id={`memberlist-badge-admin-${username}`}
                            color="secondary"
                          >
                            Admin
                          </Badge>
                        )}
                      </Col>
                      <Col sm={2} className="d-flex justify-content-end">
                        {owner.username !== username && (
                          <div>
                            {isUserOwner && (
                              <RiAdminFill
                                id={`memberslist-adminactions-btn-${username}`}
                                className={
                                  isUserAdmin(username)
                                    ? "text-danger small mx-3"
                                    : "text-info small mx-3"
                                }
                                style={{ cursor: "pointer" }}
                                title={
                                  isUserAdmin(username)
                                    ? "移除管理员"
                                    : "提升管理员"
                                }
                                onClick={() =>
                                  isUserAdmin(username)
                                    ? removeUserAdminCb(username)
                                    : promoteUserAdminCb(username)
                                }
                              />
                            )}
                            {(!isUserAdmin(username) ||
                              (isUserAdmin(username) && isUserOwner)) &&
                              user.username !== username && (
                                <FaUserMinus
                                  id={`memberslist-removemember-btn-${username}`}
                                  className="text-danger pointer small mx-3"
                                  title="移除用户"
                                  onClick={() => removeMemberCb(username)}
                                />
                              )}
                            {!isUserOwner && user.username === username && (
                              <FaUserMinus
                                id="memberslist-leaveorg-btn"
                                className="text-danger pointer small mx-3"
                                title="离开组织"
                                onClick={() => leaveOrganizationCb}
                              />
                            )}
                          </div>
                        )}
                      </Col>
                    </Row>
                  </li>
                ),
              )}
            </ol>
          )}
        </section>
      </ContentSection>
    </Fade>
  );
}
