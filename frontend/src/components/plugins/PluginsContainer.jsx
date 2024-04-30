import React, { Suspense } from "react";
import { AiOutlineApi } from "react-icons/ai";
import { BsPeopleFill, BsSliders } from "react-icons/bs";
import { TiFlowChildren, TiBook } from "react-icons/ti";
import { IoIosEye } from "react-icons/io";
import { MdInput } from "react-icons/md";
import { PiGraphFill } from "react-icons/pi";

import {
  RouterTabs,
  FallBackLoading,
  ContentSection,
} from "@certego/certego-ui";
import { Link } from "react-router-dom";
import { Button, Col } from "reactstrap";
import { useOrganizationStore } from "../../stores/useOrganizationStore";
import { useGuideContext } from "../../contexts/GuideContext";

const Analyzers = React.lazy(() => import("./types/Analyzers"));
const Connectors = React.lazy(() => import("./types/Connectors"));
const Pivots = React.lazy(() => import("./types/Pivots"));
const Visualizers = React.lazy(() => import("./types/Visualizers"));
const Ingestors = React.lazy(() => import("./types/Ingestors"));
const Playbooks = React.lazy(() => import("./types/Playbooks"));

const routes = [
  {
    key: "plugins-analyzers",
    location: "analyzers",
    Title: () => (
      <span id="Analyzers">
        <AiOutlineApi />
        &nbsp;分析器
      </span>
    ),
    Component: () => (
      <Suspense fallback={<FallBackLoading />}>
        <Analyzers />
      </Suspense>
    ),
  },
  {
    key: "plugins-connectors",
    location: "connectors",
    Title: () => (
      <span id="Connectors">
        <TiFlowChildren />
        &nbsp;连接器
      </span>
    ),
    Component: () => (
      <Suspense fallback={<FallBackLoading />}>
        <Connectors />
      </Suspense>
    ),
  },
  {
    key: "plugins-pivots",
    location: "pivots",
    Title: () => (
      <span id="Pivots">
        <PiGraphFill />
        &nbsp;枢纽
      </span>
    ),
    Component: () => (
      <Suspense fallback={<FallBackLoading />}>
        <Pivots />
      </Suspense>
    ),
  },
  {
    key: "plugins-visualizers",
    location: "visualizers",
    Title: () => (
      <span>
        <IoIosEye />
        &nbsp;可视化
      </span>
    ),
    Component: () => (
      <Suspense fallback={<FallBackLoading />}>
        <Visualizers />
      </Suspense>
    ),
  },
  {
    key: "plugins-ingestors",
    location: "ingestors",
    Title: () => (
      <span>
        <MdInput />
        &nbsp;接收器
      </span>
    ),
    Component: () => (
      <Suspense fallback={<FallBackLoading />}>
        <Ingestors />
      </Suspense>
    ),
  },
  {
    key: "plugins-playbooks",
    location: "playbooks",
    Title: () => (
      <span>
        <TiBook />
        &nbsp;剧本
      </span>
    ),
    Component: () => (
      <Suspense fallback={<FallBackLoading />}>
        <Playbooks />
      </Suspense>
    ),
  },
];

export default function PluginsContainer() {
  console.debug("PluginsContainer rendered!");
  const {
    isUserOwner,
    organization,
    fetchAll: fetchAllOrganizations,
  } = useOrganizationStore(
    React.useCallback(
      (state) => ({
        isUserOwner: state.isUserOwner,
        fetchAll: state.fetchAll,
        organization: state.organization,
      }),
      [],
    ),
  );

  const { guideState, setGuideState } = useGuideContext();

  React.useEffect(() => {
    if (guideState.tourActive) {
      setTimeout(() => {
        setGuideState({ run: true, stepIndex: 1 });
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // on component mount
  React.useEffect(() => {
    if (!isUserOwner) {
      fetchAllOrganizations();
    }
  }, [isUserOwner, fetchAllOrganizations]);
  const configButtons = (
    <Col className="d-flex justify-content-end">
      <ContentSection className="d-inline-flex mb-0 py-0">
        {organization?.name ? (
          <Link
            className="d-flex"
            to="/me/organization/config"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button
              size="sm"
              color="darker"
              onClick={() => null}
              className="me-2"
            >
              <BsPeopleFill className="me-2" /> Organization {organization.name}
              &apos;s 插件配置
            </Button>
          </Link>
        ) : null}
        <Link
          className="d-flex"
          to="/me/config"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <Button
            id="pluginconfigbutton"
            size="sm"
            color="darker"
            onClick={() => null}
          >
            <BsSliders className="me-2" id="plugin_config" />
            你的插件配置
          </Button>
        </Link>
      </ContentSection>
    </Col>
  );
  return <RouterTabs routes={routes} extraNavComponent={configButtons} />;
}
