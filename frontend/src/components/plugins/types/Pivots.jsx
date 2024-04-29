import React from "react";

import { pivotTableColumns } from "./pluginTableColumns";
import PluginWrapper from "./PluginWrapper";
import { PluginsTypes } from "../../../constants/pluginConst";

export default function Pivots() {
  console.debug("Pivots rendered!");

  const stateSelector = React.useCallback(
    (state) => [
      state.pivotsLoading,
      state.pivotsError,
      state.pivots,
      state.retrievePivotsConfiguration,
    ],
    [],
  );

  return (
    <PluginWrapper
      heading="Pivots"
      description="枢轴旨在从一项任务创建另一项任务"
      stateSelector={stateSelector}
      columns={pivotTableColumns}
      type={PluginsTypes.PIVOT}
    />
  );
}
