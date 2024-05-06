import React from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import useTitle from "react-use/lib/useTitle";

function NoMatch() {
  console.debug("NoMatch rendered!");

  // page title
  useTitle("IntelOwl | 404: 未找到", { restoreOnUnmount: true });

  return (
    <Container className="d-flex flex-column center">
      <img src="https://http.cat/404" alt="404: Not Found" width="650px" />
      <br />
      <Link to="/" className="standout">
        返回主页 ?
      </Link>
    </Container>
  );
}

export default NoMatch;
