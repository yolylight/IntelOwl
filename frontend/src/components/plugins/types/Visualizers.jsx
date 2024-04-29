import React from "react";

import { visualizerTableColumns } from "./pluginTableColumns";
import PluginWrapper from "./PluginWrapper";
import { PluginsTypes } from "../../../constants/pluginConst";

export default function Visualizers() {
  console.debug("Visualizers rendered!");

  const stateSelector = React.useCallback(
    (state) => [
      state.visualizersLoading,
      state.visualizersError,
      state.visualizers,
      state.retrieveVisualizersConfiguration,
    ],
    [],
  );

  return (
    <PluginWrapper
      heading="Visualizers"
      description="可视化用于在分析器和连接器之后运行。可视化器在计算之后添加了逻辑，从而能以不同于报告列表的方式显示最终结果。."
      stateSelector={stateSelector}
      columns={visualizerTableColumns}
      type={PluginsTypes.VISUALIZER}
    />
  );
}
