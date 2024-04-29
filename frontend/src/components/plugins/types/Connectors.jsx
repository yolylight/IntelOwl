import React from "react";

import { connectorTableColumns } from "./pluginTableColumns";
import PluginWrapper from "./PluginWrapper";
import { PluginsTypes } from "../../../constants/pluginConst";

export default function Connectors() {
  console.debug("Connectors rendered!");

  const stateSelector = React.useCallback(
    (state) => [
      state.connectorsLoading,
      state.connectorsError,
      state.connectors,
      state.retrieveConnectorsConfiguration,
    ],
    [],
  );

  return (
    <PluginWrapper
      heading="Connectors"
      description="连接器的设计目的是在每次成功分析后运行，因此适用于自动威胁共享。它们支持与其他 SIEM/SOAR 项目集成，特别针对威胁共享平台."
      stateSelector={stateSelector}
      columns={connectorTableColumns}
      type={PluginsTypes.CONNECTOR}
    />
  );
}
