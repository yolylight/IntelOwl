import React from "react";

import { analyzersTableColumns } from "./pluginTableColumns";
import PluginWrapper from "./PluginWrapper";
import { PluginsTypes } from "../../../constants/pluginConst";

export default function Analyzers() {
  console.debug("Analyzers rendered!");

  const stateSelector = React.useCallback(
    (state) => [
      state.analyzersLoading,
      state.analyzersError,
      state.analyzers,
      state.retrieveAnalyzersConfiguration,
    ],
    [],
  );

  return (
    <PluginWrapper
      heading="Analyzers"
      description="分析器是 IntelOwl 中最重要的插件。通过它们，可以对要分析的观测值和/或文件进行数据提取."
      stateSelector={stateSelector}
      columns={analyzersTableColumns}
      type={PluginsTypes.ANALYZER}
    />
  );
}
