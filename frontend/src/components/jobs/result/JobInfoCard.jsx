import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Badge,
  Collapse,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

import {
  ContentSection,
  DateHoverable,
  CopyToClipboardButton,
  ArrowToggleIcon,
} from "@certego/certego-ui";
import { processTimeMMSS } from "../../../utils/time";

import { JobTag } from "../../common/JobTag";
import { PlaybookTag } from "../../common/PlaybookTag";
import { StatusTag } from "../../common/StatusTag";
import { TLPTag } from "../../common/TLPTag";
import { JobInfoIcon } from "./JobInfoIcon";

export function JobInfoCard({ job }) {
  const navigate = useNavigate();
  // local state
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div id="JobInfoCardSection">
      <ContentSection className="mb-0 bg-darker">
        <Row>
          <Col sm={12} md={2} className="d-flex justify-content-start">
            {job.investigation && (
              <>
                <Button
                  className="bg-darker border-1"
                  onClick={() =>
                    navigate(`/investigation/${job.investigation}`)
                  }
                  id="investigationOverviewBtn"
                >
                  调查概览
                </Button>
                <UncontrolledTooltip
                  placement="top"
                  target="investigationOverviewBtn"
                >
                  该任务是调查 #{job.investigation} 的一部分
                </UncontrolledTooltip>
              </>
            )}
          </Col>
          <Col
            className="d-flex-start-start justify-content-center"
            sm={12}
            md={8}
          >
            <h3>
              <JobInfoIcon job={job} />
              {job.is_sample ? (
                <CopyToClipboardButton
                  showOnHover
                  id="file_name"
                  text={job.file_name}
                >
                  {job.file_name}
                </CopyToClipboardButton>
              ) : (
                <CopyToClipboardButton
                  showOnHover
                  id="observable_name"
                  text={job.observable_name}
                >
                  {job.observable_name}
                </CopyToClipboardButton>
              )}
            </h3>
            <Badge className="ms-1 float-end" color="info">
              {job.is_sample
                ? `file: ${job.file_mimetype}`
                : job.observable_classification}
            </Badge>
          </Col>
          <Col sm={12} md={2} className="d-flex justify-content-end">
            <Button
              className="bg-darker border-0"
              onClick={() => setIsOpen(!isOpen)}
              id="JobInfoCardDropDown"
            >
              <ArrowToggleIcon isExpanded={isOpen} />
            </Button>
            <UncontrolledTooltip placement="left" target="JobInfoCardDropDown">
              切换任务元数据
            </UncontrolledTooltip>
          </Col>
        </Row>
      </ContentSection>
      <Collapse isOpen={isOpen} id="JobInfoCardCollapse">
        <ContentSection className="border-top-0 bg-body ps-0 pe-1 py-1">
          <ListGroup
            horizontal
            className="align-items-start flex-wrap flex-lg-nowrap"
          >
            {[
              ["状态", <StatusTag status={job.status} />],
              ["TLP", <TLPTag value={job.tlp} />],
              ["用户", job.user?.username],
              ["MD5", job.md5],
              ["处理时间 (mm:ss)", processTimeMMSS(job.process_time)],
              [
                "开始时间",
                <DateHoverable
                  id={`overview-received_request_time__${job.id}`}
                  value={job.received_request_time}
                  format="hh:mm:ss a MMM do, yyyy"
                />,
              ],
              [
                "结束时间",
                job.finished_analysis_time ? (
                  <DateHoverable
                    id={`overview-finished_analysis_time__${job.id}`}
                    value={job.finished_analysis_time}
                    format="hh:mm:ss a MMM do, yyyy"
                  />
                ) : (
                  "-"
                ),
              ],
            ].map(([key, value]) => (
              <ListGroupItem key={key}>
                <small className="fw-bold text-light">{key}</small>
                <div className="bg-dark p-1 text-light">{value}</div>
              </ListGroupItem>
            ))}
          </ListGroup>
          <ListGroup
            horizontal
            className="align-items-start flex-wrap flex-lg-nowrap"
          >
            {[
              [
                "剧本",
                <PlaybookTag
                  key={job.playbook_to_execute}
                  playbook={job.playbook_to_execute}
                  className="mr-2"
                />,
              ],
              [
                "标签",
                job.tags.map((tag) => (
                  <JobTag key={tag.label} tag={tag} className="me-2" />
                )),
              ],
              [
                "警告",
                <ul className="text-warning">
                  {job.warnings.map((error) => (
                    <li>{error}</li>
                  ))}
                </ul>,
              ],
              [
                "错误",
                <ul className="text-danger">
                  {job.errors.map((error) => (
                    <li>{error}</li>
                  ))}
                </ul>,
              ],
            ].map(([key, value]) => (
              <ListGroupItem key={key}>
                <small className="fw-bold text-light">{key}</small>
                <div className="bg-dark p-1">{value}</div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ContentSection>
      </Collapse>
    </div>
  );
}

JobInfoCard.propTypes = {
  job: PropTypes.object.isRequired,
};
