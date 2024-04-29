/* eslint-disable react/prop-types */
import React from "react";

import {
  DefaultColumnFilter,
  SelectOptionsFilter,
  LinkOpenViewIcon,
  DateHoverable,
  CopyToClipboardButton,
} from "@certego/certego-ui";

import { JobTag } from "../../common/JobTag";
import { StatusTag } from "../../common/StatusTag";
import { TLPTag } from "../../common/TLPTag";
import { TlpChoices } from "../../../constants/advancedSettingsConst";
import { InvestigationStatuses } from "../../../constants/investigationConst";

export const investigationTableColumns = [
  {
    Header: () => "ID", // No header
    id: "id",
    accessor: "id",
    maxWidth: 75,
    disableSortBy: true,
    Cell: ({ value: id }) => (
      <div className="d-flex flex-column justify-content-center">
        <p>#{id}</p>
        <LinkOpenViewIcon
          id={id}
          href={`/investigation/${id}`}
          tooltip="查看调查报告"
        />
      </div>
    ),
    Filter: DefaultColumnFilter,
  },
  {
    Header: "已创建",
    id: "start_time",
    accessor: "start_time",
    Cell: ({ value }) => (
      <DateHoverable ago value={value} format="hh:mm:ss a MMM do, yyyy" />
    ),
    maxWidth: 100,
  },
  {
    Header: "用户",
    id: "owner",
    accessor: "owner",
    Cell: ({ value, row: { original: investigation } }) => (
      <CopyToClipboardButton
        showOnHover
        id={`table-user-${investigation?.id}`}
        key={`table-user-${investigation?.id}`}
        text={value}
        className="d-block text-truncate"
      >
        {value}
      </CopyToClipboardButton>
    ),
    disableSortBy: true,
    Filter: DefaultColumnFilter,
    maxWidth: 120,
  },
  {
    Header: "名称",
    id: "name",
    accessor: "name",
    Cell: ({ value, row: { original: investigation } }) => (
      <CopyToClipboardButton
        showOnHover
        id={`table-name-${investigation?.id}`}
        key={`table-name-${investigation?.id}`}
        text={value}
        className="d-block text-truncate"
      >
        {value}
      </CopyToClipboardButton>
    ),
    disableSortBy: true,
    Filter: DefaultColumnFilter,
  },
  {
    Header: "TLP",
    id: "tlp",
    accessor: "tlp",
    Cell: ({ value }) => <TLPTag value={value} />,
    disableSortBy: true,
    Filter: SelectOptionsFilter,
    selectOptions: TlpChoices,
    maxWidth: 90,
  },
  {
    Header: "标签",
    id: "tags",
    accessor: "tags",
    Cell: ({ value }) =>
      value.map(
        (tag) =>
          tag !== null && (
            <JobTag
              key={`jobtable-tags-${tag?.label}`}
              tag={tag}
              className="ms-2"
            />
          ),
      ),
    disableSortBy: true,
    maxWidth: 100,
    Filter: DefaultColumnFilter,
    filterValueAccessorFn: (tags) => tags.map((tag) => tag.label),
  },
  {
    Header: "已创建任务",
    id: "total_jobs",
    accessor: "total_jobs",
    Cell: ({ value }) => value,
    disableSortBy: true,
    maxWidth: 90,
  },
  {
    Header: "状态",
    id: "status",
    accessor: "status",
    Cell: ({ value }) => <StatusTag status={value} />,
    disableSortBy: true,
    Filter: SelectOptionsFilter,
    selectOptions: Object.values(InvestigationStatuses),
    maxWidth: 110,
  },
];
