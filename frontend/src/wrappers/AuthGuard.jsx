import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

import { FallBackLoading, addToast } from "@certego/certego-ui";

import { useAuthStore } from "../stores/useAuthStore";

/*
Wrapper for Routes which should be accessible only to a authenticated user
*/
export default function AuthGuard({ children }) {
  // store
  const [loading, isAuthenticated] = useAuthStore(
    React.useCallback((state) => [state.loading, state.isAuthenticated()], []),
  );

  const location = useLocation();
  const didJustLogout = location?.pathname.includes("logout");

  // side effects
  React.useEffect(() => {
    if (!didJustLogout && !isAuthenticated && !loading) {
      addToast("访问请求的页面需要登录.", null, "info");
    }
  }, [didJustLogout, isAuthenticated, loading]);

  if (loading) {
    return <FallBackLoading />;
  }

  if (!isAuthenticated && !loading) {
    return (
      <Navigate
        to={{
          pathname: didJustLogout ? "/" : "/login",
          search: didJustLogout ? undefined : `?next=${location.pathname}`,
        }}
      />
    );
  }

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
