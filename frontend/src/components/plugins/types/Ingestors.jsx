import React from "react";

import { ingestorTableColumns } from "./pluginTableColumns";
import PluginWrapper from "./PluginWrapper";
import { PluginsTypes } from "../../../constants/pluginConst";

export default function Ingestors() {
  console.debug("Ingestors rendered!");

  const stateSelector = React.useCallback(
    (state) => [
      state.ingestorsLoading,
      state.ingestorsError,
      state.ingestors,
      state.retrieveIngestorsConfiguration,
    ],
    [],
  );

  return (
    <PluginWrapper
      heading="Ingestors"
      description="采集器旨在从外部源创建任务."
      stateSelector={stateSelector}
      columns={ingestorTableColumns}
      type={PluginsTypes.INGESTOR}
    />
  );
}
