import React from "react";
import classnames from "classnames";
import { Badge, UncontrolledTooltip } from "reactstrap";
import { MdInfoOutline } from "react-icons/md";

import { useAuthStore } from "../stores/useAuthStore";

export default function useQuotaBadge() {
  // auth store
  const [access, fetchUserAccess] = useAuthStore(
    React.useCallback(
      (state) => [state.access, state.service.fetchUserAccess],
      [],
    ),
  );

  const quota = access; // alias for backwards compatibility

  // callbacks
  const MonthBadge = React.useCallback(
    (props) => (
      <Badge
        {...props}
        className={classnames("user-select-none bg-gradient", props.className)}
      >
        {`Month: ${quota?.month_submissions}`}
      </Badge>
    ),
    [quota],
  );

  const TotalBadge = React.useCallback(
    (props) => (
      <Badge
        {...props}
        className={classnames("user-select-none bg-gradient", props.className)}
      >
        {`Total: ${quota?.total_submissions}`}
      </Badge>
    ),
    [quota],
  );

  const QuotaInfoIcon = React.useCallback(
    () => (
      <>
        <MdInfoOutline id="quota-info-icon" />
        <UncontrolledTooltip
          target="quota-info-icon"
          placement="right"
          fade={false}
          innerClassName="p-2 border border-info text-start text-nowrap md-fit-content"
        >
          您的提交配额.
          <ul>
            <li>月提交不包括失败的分析</li>
            <li>提交总数包括您曾经进行的所有分析.</li>
          </ul>
        </UncontrolledTooltip>
      </>
    ),
    [],
  );

  return [{ MonthBadge, TotalBadge, QuotaInfoIcon }, fetchUserAccess, quota];
}
