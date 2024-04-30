import React from "react";
import { Container } from "reactstrap";
import useTitle from "react-use/lib/useTitle";
import { Link } from "react-router-dom";
import ConfigContainer from "./ConfigContainer";

export default function UserConfig() {
  console.debug("UserConfigPage rendered!");

  useTitle("IntelOwl | 配置", {
    restoreOnUnmount: true,
  });

  return (
    <Container>
      <h4>你的插件配置</h4>
      <span className="text-muted">
        注意：您的插件配置会覆盖您的 {" "}
        <Link to="/me/organization/config">
          组织配置
        </Link>{" "}
        (如有).
      </span>
      <ConfigContainer filterFunction={(item) => !item.organization} />
    </Container>
  );
}
