import React from "react";
import { addToast } from "@certego/certego-ui";
import axios from "axios";

import { PLAYBOOKS_CONFIG_URI } from "../../../../constants/apiURLs";

export async function saveJobAsPlaybook(values) {
  let success = false;
  const data = {
    name: values.name,
    description: values.description,
    analyzers: values.analyzers,
    connectors: values.connectors,
    pivots: values.pivots,
    runtime_configuration: values.runtimeConfiguration,
    tags_labels: values.tags_labels,
    tlp: values.tlp,
    scan_mode: values.scan_mode,
    scan_check_time: values.scan_check_time,
  };
  try {
    const response = await axios.post(PLAYBOOKS_CONFIG_URI, data);

    success = response.status === 200;
    if (success) {
      addToast(
        <span>
          成功创建剧本 {response.data.name}
        </span>,
        null,
        "info",
      );
    }
  } catch (error) {
    addToast(
      <span>剧本 {values.name} 创建失败</span>,
      error.parsedMsg,
      "warning",
    );
  }
  return success;
}
