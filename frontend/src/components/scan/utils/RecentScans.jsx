import React, { useMemo } from "react";
import PropTypes from "prop-types";
import md5 from "md5";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, UncontrolledTooltip } from "reactstrap";
import { MdInfoOutline } from "react-icons/md";
import { DateHoverable, Loader } from "@certego/certego-ui";
import { useRecentScansStore } from "../../../stores/useRecentScansStore";
import { JobResultSections } from "../../../constants/miscConst";
import { JobTypes } from "../../../constants/jobConst";

function RecentScansCard({
  pk,
  title,
  importance,
  playbook,
  finished,
  tlp,
  user,
}) {
  const navigate = useNavigate();
  const onClick = React.useCallback(
    (jobId) => {
      navigate(`/jobs/${jobId}/${JobResultSections.VISUALIZER}/`);
    },
    [navigate],
  );

  return (
    <Card
      id={`RecentScanCard-${pk}`}
      className="border-dark mb-2 pointer"
      onClick={() => onClick(pk)}
    >
      <CardHeader className="d-flex justify-content-between mx-3 bg-dark text-center p-0">
        <span className="text-truncate" style={{ maxWidth: "75%" }}>
          {title}
        </span>
        <small className="pt-1 text-secondary" style={{ fontSize: "0.75rem" }}>
          得分: {importance}
        </small>
      </CardHeader>
      <CardBody
        className="d-flex bg-darker p-2 px-4"
        style={{
          borderBottomLeftRadius: "0.75rem",
          borderBottomRightRadius: "0.75rem",
        }}
      >
        <div className="d-flex flex-column col-8 px-2">
          <small>
            剧本:{" "}
            <small className="text-accent">
              {playbook || "自定义分析"}
            </small>
          </small>
          <small>
            已完成:{" "}
            <small>
              <DateHoverable
                className="text-accent"
                ago
                value={finished}
                format="hh:mm:ss a MMM do, yyyy"
              />
            </small>
          </small>
        </div>
        <div className="d-flex flex-column col-4">
          <small>
            TLP: <small className="text-accent">{tlp}</small>
          </small>
          <small>
            用户: <small className="text-accent">{user}</small>
          </small>
        </div>
      </CardBody>
    </Card>
  );
}

RecentScansCard.propTypes = {
  pk: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  importance: PropTypes.number.isRequired,
  playbook: PropTypes.string,
  finished: PropTypes.any.isRequired,
  tlp: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

RecentScansCard.defaultProps = {
  playbook: null,
};

export default function RecentScans({ classification, param }) {
  // api
  const [
    loadingScansUser,
    loadingScansInsertedAnalyzable,
    recentScansUserError,
    recentScansError,
    recentScansUser,
    recentScans,
    fetchRecentScansUser,
    fetchRecentScans,
  ] = useRecentScansStore((state) => [
    state.loadingScansUser,
    state.loadingScansInsertedAnalyzable,
    state.recentScansUserError,
    state.recentScansError,
    state.recentScansUser,
    state.recentScans,
    state.fetchRecentScansUser,
    state.fetchRecentScans,
  ]);

  console.debug(
    "loadingScansUser",
    loadingScansUser,
    "loadingScans",
    loadingScansInsertedAnalyzable,
  );

  const isSample = classification === JobTypes.FILE;

  // file md5
  const [fileMd5, setFileMd5] = React.useState("");
  /* md5 computation takes lots of time for huge file:
  this freezes the scan form ui (render this component), we need this caching.
  */
  useMemo(() => {
    if (isSample && param) {
      param.text().then((text) => setFileMd5(md5(text)));
    }
  }, [isSample, param]);

  React.useEffect(() => {
    fetchRecentScansUser(isSample);
  }, [fetchRecentScansUser, isSample]);
  console.debug("recentScansUser", recentScansUser);

  React.useEffect(() => {
    fetchRecentScans(fileMd5.length ? fileMd5 : md5(param), isSample);
  }, [fetchRecentScans, fileMd5, param, isSample]);
  console.debug("recentScans", recentScans);

  // remove duplicate job
  const allRecentScans = Array.from(
    [...recentScans, ...recentScansUser]
      .reduce((allScan, scan) => allScan.set(scan.pk, scan), new Map())
      .values(),
  );
  console.debug("allRecentScans", allRecentScans);

  return (
    <Loader
      loading={loadingScansUser}
      error={recentScansUserError}
      render={() => (
        <div>
          <div className="d-flex justify-content-between my-4 align-items-end">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0 me-2">最近扫描</h5>
              <MdInfoOutline id="recentscans-info-icon" />
              <UncontrolledTooltip
                target="recentscans-info-icon"
                placement="right"
                fade={false}
                innerClassName="p-2 text-start text-nowrap md-fit-content"
              >
                <ul>
                  <li>观测值: 14天之前扫描</li>
                  <li>文件: 60 天前的扫描</li>
                </ul>
                如果没有插入任何可观察对象或文件，则最近的扫描与用户而非组织有关
              </UncontrolledTooltip>
            </div>
            <small className="mx-2 text-gray">
              总计{allRecentScans?.length}
            </small>
          </div>
          <Loader
            loading={loadingScansInsertedAnalyzable}
            error={recentScansError}
            render={() => (
              <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                {allRecentScans.length ? (
                  allRecentScans.map((recentScan) => (
                    <RecentScansCard
                      pk={recentScan.pk}
                      title={recentScan.file_name || recentScan.observable_name}
                      importance={recentScan.importance}
                      playbook={recentScan.playbook}
                      finished={recentScan.finished_analysis_time}
                      tlp={recentScan.tlp}
                      user={recentScan.user}
                    />
                  ))
                ) : (
                  <small className="text-gray">没有最近扫描</small>
                )}
              </div>
            )}
          />
        </div>
      )}
    />
  );
}

RecentScans.propTypes = {
  classification: PropTypes.string.isRequired,
  param: PropTypes.any,
};

RecentScans.defaultProps = {
  param: "",
};
