import React from "react";
import { Alert, Container, Row } from "reactstrap";
import useTitle from "react-use/lib/useTitle";

import { ContentSection } from "@certego/certego-ui";

import TokenAccess from "./TokenAccess";
import { PYINTELOWL_GH_URL } from "../../../constants/environment";

export default function TokenPage() {
  console.debug("APIPage rendered!");

  // page title
  useTitle("IntelOwl | API", {
    restoreOnUnmount: true,
  });

  return (
    <Container>
      {/* Alert */}
      <Row className="my-4">
        <Alert color="secondary" className="mx-3 mx-md-auto text-center">
          <span>
            您可以生成一个 API 密钥来访问 IntelOwl 的 RESTful API.
            查看可用的 Python 和 Go 客户端:
            <a
              href={PYINTELOWL_GH_URL}
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
      {/* API Access */}
      <h6>API 访问</h6>
      <ContentSection className="bg-body border border-dark">
        <TokenAccess />
      </ContentSection>
    </Container>
  );
}
