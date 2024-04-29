import React from "react";
import { Link } from "react-router-dom";
import { Alert, Row, Container } from "reactstrap";
import useTitle from "react-use/lib/useTitle";
import { LoadingBoundary, ErrorAlert } from "@certego/certego-ui";
import { useOrganizationStore } from "../../stores/useOrganizationStore";
import { useAuthStore } from "../../stores/useAuthStore";

import ConfigContainer from "../user/config/ConfigContainer";
import { OrgCreateButton } from "./utils/OrgCreateButton";

export default function OrgConfig() {
  console.debug("OrgConfigPage rendered!");

  // consume store
  const [user] = useAuthStore((state) => [state.user]);

  const {
    loading,
    error: respErr,
    organization,
    fetchAll,
    isUserAdmin,
    noOrg,
  } = useOrganizationStore(
    React.useCallback(
      (state) => ({
        loading: state.loading,
        error: state.error,
        organization: state.organization,
        fetchAll: state.fetchAll,
        isUserAdmin: state.isUserAdmin,
        noOrg: state.noOrg,
      }),
      [],
    ),
  );

  // on component mount
  React.useEffect(() => {
    if (Object.keys(organization).length === 0 && !noOrg) {
      fetchAll();
    }
  }, [noOrg, organization, fetchAll]);

  // page title
  useTitle(
    `IntelOwl | 组织 ${
      organization?.name ? `(${organization?.name})` : ""
    } config`,
    { restoreOnUnmount: true },
  );

  return (
    <LoadingBoundary
      loading={loading}
      error={respErr}
      render={() => {
        if (noOrg)
          return (
            <Container>
              <Alert color="secondary" className="mt-3 mx-auto">
                <section>
                  <h5 className="text-warning text-center">
                    您既不是任何组织的所有者，也不是其管理者.
                  </h5>
                  <p className="text-center">
                    您可以选择创建一个新组织.
                  </p>
                </section>
                <section className="text-center">
                  <OrgCreateButton onCreate={fetchAll} />
                </section>
              </Alert>
            </Container>
          );
        return (
          <Container>
            <h4>{organization.name}的插件配置</h4>
            <span className="text-muted">
              注意: 你的 <Link to="/me/config">插件配置</Link>{" "}
              覆盖你的组织配置.
            </span>
            <ConfigContainer
              filterFunction={(item) => item.organization}
              additionalConfigData={{
                organization: organization.name,
              }}
              editable={isUserAdmin(user.username)}
            />
          </Container>
        );
      }}
      renderError={({ error }) => (
        <Row>
          {error?.response?.status === 404 ? (
            <Container>
              <Alert color="secondary" className="mt-3 mx-auto">
                <section>
                  <h5 className="text-warning text-center">
                    你不是任何组织的所有者.
                  </h5>
                  <p className="text-center">
                    你可以选择创建一个新组织.
                  </p>
                </section>
                <section className="text-center">
                  <OrgCreateButton onCreate={fetchAll} />
                </section>
              </Alert>
            </Container>
          ) : (
            <ErrorAlert error={error} />
          )}
        </Row>
      )}
    />
  );
}
