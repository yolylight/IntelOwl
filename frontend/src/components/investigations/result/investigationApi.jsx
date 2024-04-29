import React from "react";
import axios from "axios";

import { addToast } from "@certego/certego-ui";

import {
  INVESTIGATION_BASE_URI,
  JOB_BASE_URI,
} from "../../../constants/apiURLs";
import { areYouSureConfirmDialog } from "../../common/areYouSureConfirmDialog";
import { prettifyErrors } from "../../../utils/api";

export async function createInvestigation() {
  let success = false;
  const data = {
    name: "自定义调查",
    description: "",
    for_organization: true,
  };
  try {
    const response = await axios.post(`${INVESTIGATION_BASE_URI}`, data);
    success = response.status === 201;
    if (success) {
      addToast(
        <span>已创建调查 #{response.data.id}</span>,
        null,
        "success",
      );
      return response.data.id;
    }
  } catch (error) {
    addToast(
      "创建新调查失败",
      prettifyErrors(error),
      "warning",
    );
  }
  return success;
}

export async function deleteInvestigation(investigationId) {
  let success = false;
  try {
    const response = await axios.delete(
      `${INVESTIGATION_BASE_URI}/${investigationId}`,
    );
    success = response.status === 204;
    if (success) {
      addToast(
        <span>已删除调查 #{investigationId}</span>,
        null,
        "info",
      );
    }
  } catch (error) {
    addToast(
      `删除调查失败 #${investigationId}`,
      prettifyErrors(error),
      "warning",
    );
  }
  return success;
}

export async function updateInvestigation(investigationId, data) {
  let success = false;
  try {
    const response = await axios.patch(
      `${INVESTIGATION_BASE_URI}/${investigationId}`,
      data,
    );
    success = response.status === 200;
    if (success) {
      addToast(
        <span>已更新调查 #{investigationId}</span>,
        null,
        "info",
      );
    }
  } catch (error) {
    addToast(
      `更新调查失败 #${investigationId}`,
      prettifyErrors(error),
      "warning",
    );
  }
  return success;
}

export async function addJob(investigationId, jobId) {
  let success = false;
  const data = { job: jobId };
  try {
    const response = await axios.post(
      `${INVESTIGATION_BASE_URI}/${investigationId}/add_job`,
      data,
    );
    success = response.status === 200;
    if (success) {
      addToast(
        <span>
          任务 #{jobId} 已添加到调查 #{investigationId}
        </span>,
        null,
        "success",
      );
    }
  } catch (error) {
    addToast(
      `添加任务 #${jobId} 到调查 #${investigationId} 失败`,
      prettifyErrors(error),
      "warning",
    );
  }
  return success;
}

export async function removeJob(investigationId, jobId) {
  let success = false;
  try {
    const response = await axios.post(
      `${INVESTIGATION_BASE_URI}/${investigationId}/remove_job`,
      { job: jobId },
    );
    success = response.status === 200;
    if (success) {
      addToast(
        <span>
          任务 #{jobId} 已从调查 #{investigationId} 移除
        </span>,
        null,
        "success",
      );
    }
  } catch (error) {
    addToast(
      `从调查 #${investigationId} 移除任务 #${jobId} 失败`,
      prettifyErrors(error),
      "warning",
    );
  }
  return success;
}

export async function addExistingJob(jobToAdd, currentInvestigationId) {
  let success = false;
  let jobInvestigationId = null;
  try {
    const response = await axios.get(`${JOB_BASE_URI}/${jobToAdd}`);
    success = response.status === 200;
    if (success) {
      jobInvestigationId = response.data.investigation;
    }
  } catch (error) {
    addToast(
      `添加任务 #${jobToAdd} 到调查 #${currentInvestigationId} 失败`,
      prettifyErrors(error),
      "warning",
    );
    return success;
  }

  // case 1 - Job is already part of this investigation
  if (jobInvestigationId === currentInvestigationId) {
    addToast(
      `添加任务 #${jobToAdd} 到调查 #${currentInvestigationId} 失败`,
      "任务已经是调查一部分",
      "warning",
    );
  }
  // case 2 - job is already part of different investigation
  else if (jobInvestigationId) {
    const sure = await areYouSureConfirmDialog(
      `从调查 #${jobInvestigationId} 移除任务 #${jobToAdd} 并添加到调查 #${currentInvestigationId}`,
    );
    if (sure) {
      // remove job from previous investigation
      const isJobRemoved = await removeJob(jobInvestigationId, jobToAdd);
      if (isJobRemoved) {
        // add job into current investigation
        const isJobAdded = await addJob(currentInvestigationId, jobToAdd);
        return isJobAdded;
      }
      return isJobRemoved;
    }
  }
  // case 3 - job is not part of any investigation
  else {
    const isJobAdded = await addJob(currentInvestigationId, jobToAdd);
    return isJobAdded;
  }
  return false;
}
