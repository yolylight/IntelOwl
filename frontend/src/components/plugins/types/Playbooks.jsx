import React from "react";

import { playbookTableColumns } from "./pluginTableColumns";
import { PluginsTypes } from "../../../constants/pluginConst";
import PluginWrapper from "./PluginWrapper";

export default function Playbooks() {
  console.debug("Playbooks rendered!");

  const stateSelector = React.useCallback(
    (state) => [
      state.playbooksLoading,
      state.playbooksError,
      state.playbooks,
      state.retrievePlaybooksConfiguration,
    ],
    [],
  );

  return (
    <PluginWrapper
      heading="Playbooks"
      description="剧本的设计目的是便于共享在特定类型的可观测对象上运行插件（分析器、连接器......）的序列."
      stateSelector={stateSelector}
      columns={playbookTableColumns}
      type={PluginsTypes.PLAYBOOK}
    />
  );
}
