import React from "react";
import Joyride from "react-joyride";
import { Outlet, useNavigate } from "react-router-dom";
import { useMount } from "react-use";
import { useGuideContext } from "../contexts/GuideContext";

export default function GuideWrapper() {
  const { guideState, setGuideState } = useGuideContext();
  const navigate = useNavigate();

  const steps = [
    {
      target: "#home__bgImg",
      content: (
        <div id="guidebox">
          <h3>Guide</h3>
          <p>
            欢迎访问 IntelOwls 初次访客指南！如果您还有其他问题，请访问我们的{" "}
            <a href="https://intelowl.readthedocs.io/en/latest/">文档</a> 或者在{" "}
            <a href="https://www.honeynet.org/gsoc/">
              官方频道联系我们
            </a>
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: "#Analyzers",
      content: (
        <div id="guidebox">
          <h3>Plugins</h3>
          <br />
          <p>
            插件是 IntelOwl 的核心模块化组件，可以方便地添加、更改和定制。其中最重要的是分析器，它可以对要分析的观测指标和/或文件进行数据提取.
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: "#pluginconfigbutton",
      content: (
        <div id="guidebox">
          <h3>插件配置</h3>
          <p>编写自己的插件配置!</p>
          <p>
            注意：有些插件开箱即用，有些则需要配置（例如使用 API 密钥）。.
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: "#scanpage",
      content: (
        <div id="guidebox">
          <h3>扫描页</h3>
          <p>
            只需三个步骤，您就可以开始分析各种观测值{" "}
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: "#selectobservable",
      content: (
        <div id="guidebox">
          <p>选择/添加 观测值 </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: "#selectplugins",
      content: (
        <div id="guidebox">
          <p>
            选择一个剧本.
            <br /> 剧本的设计目的是便于共享在特定类型的可观测对象上运行插件（分析器/、连接器......）的序列.
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: "#startScan",
      content: (
        <div id="guidebox">
          <h3>点击开始扫描</h3>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: "#jobsHistory",
      content: (
        <div id="guidebox">
          <h3>任务历史</h3>
          <p>
            在此，您可以查看所有以前的工作列表，并通过点击表格中的特定工作来扩展详细信息
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: "#Dashboard_title",
      content: (
        <div id="guidebox">
          <h3>仪表盘</h3>
          <p>在此查看以前的工作详情，以及图表和更多信息</p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: "#Dashboard_timepicker",
      content: (
        <div id="guidebox">
          <h3>筛选器</h3>
          <p>按时间筛选，了解以前工作的详细信息</p>
        </div>
      ),
      disableBeacon: true,
    },
  ];

  useMount(() => {
    setGuideState({
      steps,
    });
  });

  const handleCallback = (data) => {
    const { action, index, _lifecycle, type } = data;

    switch (index) {
      case 0:
        if (type === "step:after") {
          setGuideState({ run: false, stepIndex: 1 });
          navigate("/plugins");
        }
        break;
      case 1:
        if (type === "step:after") {
          if (action === "close") {
            setGuideState({ run: true, stepIndex: 2 });
          } else {
            setGuideState({ run: false, stepIndex: 0 });
            navigate("/");
          }
        }
        break;
      case 2:
        if (type === "step:after") {
          if (action === "close") {
            setGuideState({ run: false, stepIndex: 3 });
            navigate("/scan");
          } else {
            setGuideState({ run: false, stepIndex: 0 });
            navigate("/");
          }
        }
        break;
      case 3:
        if (type === "step:after") {
          if (action === "close") {
            setGuideState({ run: true, stepIndex: 4 });
          } else {
            setGuideState({ run: false, stepIndex: 0 });
            navigate("/");
          }
        }
        break;
      case 4:
        if (type === "step:after") {
          if (action === "close") {
            setGuideState({ run: true, stepIndex: 5 });
          } else {
            setGuideState({ run: false, stepIndex: 0 });
            navigate("/");
          }
        }
        break;
      case 5:
        if (type === "step:after") {
          if (action === "close") {
            setGuideState({ run: true, stepIndex: 6 });
          } else {
            setGuideState({ run: false, stepIndex: 0 });
            navigate("/");
          }
        }
        break;
      case 6:
        if (type === "step:after") {
          if (action === "close") {
            setGuideState({ run: true, stepIndex: 7 });
            navigate("/jobs");
          } else {
            setGuideState({ run: false, stepIndex: 0 });
            navigate("/");
          }
        }
        break;
      case 7:
        if (type === "step:after") {
          if (action === "close") {
            setGuideState({ run: true, stepIndex: 8 });
            navigate("/dashboard");
          } else {
            setGuideState({ run: false, stepIndex: 0 });
            navigate("/");
          }
        }
        break;
      case 8:
        if (type === "step:after") {
          if (action === "close") {
            setGuideState({ run: true, stepIndex: 9 });
          } else {
            setGuideState({ run: false, stepIndex: 0 });
            navigate("/");
          }
        }
        break;
      case 9:
        if (type === "step:after") {
          if (action === "close") {
            setGuideState({ run: true, stepIndex: 10 });
            navigate("/");
          } else {
            setGuideState({ run: false, stepIndex: 0 });
            navigate("/");
          }
        }
        break;
      default:
        setGuideState({ run: false, stepIndex: 0 });
        navigate("/");
        break;
    }
  };

  return (
    <>
      <Outlet />
      <Joyride
        callback={handleCallback}
        run={guideState.run}
        hideCloseButton
        locale={{
          // NOTE: this fixes the button behaviours for react-joyride
          close: "Next",
          back: "Close",
        }}
        stepIndex={guideState.stepIndex}
        steps={guideState.steps}
        styles={{
          options: {
            arrowColor: "#000",
            backgroundColor: "#001D24",
            primaryColor: "#5592AA",
            textColor: "#fff",
          },
        }}
      />
    </>
  );
}
