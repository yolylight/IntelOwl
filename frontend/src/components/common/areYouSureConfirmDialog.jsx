import React from "react";
import { IoMdWarning } from "react-icons/io";

import { confirm } from "@certego/certego-ui";

export const areYouSureConfirmDialog = (opName) =>
  confirm({
    title: (
      <div className="d-flex-start-center">
        <IoMdWarning className="text-warning" />
        <span className="ms-1">确认</span>
      </div>
    ),
    message: (
      <div className="text-wrap">
        <h6 className="text-muted">操作:</h6>
        <h6 className="text-center text-ul fst-italic">{opName}</h6>
        <hr className="bg-dark" />
        <span className="">你确定么 ?</span>
      </div>
    ),
    confirmColor: "secondary",
    cancelColor: "link text-gray",
  });
