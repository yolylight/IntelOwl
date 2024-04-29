import React from "react";
import axios from "axios";

import { addToast } from "@certego/certego-ui";

import { JOB_BASE_URI } from "../../../constants/apiURLs";
import { areYouSureConfirmDialog } from "../../common/areYouSureConfirmDialog";

export async function downloadJobSample(jobId) {
  let blob;
  try {
    const resp = await axios.get(`${JOB_BASE_URI}/${jobId}/download_sample`, {
      responseType: "blob",
    });
    blob = new Blob([resp.data]);
  } catch (error) {
    addToast("失败", error.parsedMsg, "warning");
  }
  return blob;
}

export async function killJob(jobId) {
  const sure = await areYouSureConfirmDialog(`结束任务 #${jobId}`);
  if (!sure) return Promise.reject();
  let success = false;
  try {
    const response = await axios.patch(`${JOB_BASE_URI}/${jobId}/kill`);
    success = response.status === 204;
    if (success) {
      addToast(<span>发送任务 #{jobId} 的结束请求</span>, null, "info");
    }
  } catch (error) {
    addToast(
      <span>
        失败. 操作: <em>结束任务 #{jobId}</em>
      </span>,
      error.parsedMsg,
      "warning",
    );
  }
  return success;
}

export async function deleteJob(jobId) {
  const sure = await areYouSureConfirmDialog(`删除任务 #${jobId}`);
  if (!sure) return Promise.reject();
  let success = false;
  try {
    const response = await axios.delete(`${JOB_BASE_URI}/${jobId}`);
    success = response.status === 204;
    if (success) {
      addToast(<span>已删除任务 #{jobId}</span>, null, "info");
    }
  } catch (error) {
    addToast(
      <span>
        失败. 操作: <em>删除任务 #{jobId}</em>
      </span>,
      error.parsedMsg,
      "warning",
    );
  }
  return success;
}

export async function killPlugin(jobId, plugin) {
  const sure = await areYouSureConfirmDialog(
    `结束 ${plugin.type} '${plugin.name}'`,
  );
  if (!sure) return Promise.reject();
  let success = false;
  try {
    const response = await axios.patch(
      `${JOB_BASE_URI}/${jobId}/${plugin.type}/${plugin.id}/kill`,
    );
    success = response.status === 204;
    if (success) {
      addToast(
        <span>
          发送 {plugin.type} <em>{plugin.name}</em> 结束请求
        </span>,
        null,
        "info",
      );
    }
  } catch (error) {
    addToast(
      <span>
        失败. 操作: 结束 {plugin.type} <em>{plugin.name}</em>
      </span>,
      error.parsedMsg,
      "warning",
    );
  }
  return success;
}

export async function retryPlugin(jobId, plugin) {
  const sure = await areYouSureConfirmDialog(
    `retry ${plugin.type} '${plugin.name}'`,
  );
  if (!sure) return Promise.reject();
  let success = false;
  try {
    const response = await axios.patch(
      `${JOB_BASE_URI}/${jobId}/${plugin.type}/${plugin.id}/retry`,
    );
    success = response.status === 204;
    if (success) {
      addToast(
        <span>
          重试发送 {plugin.type} <em>{plugin.name}</em> 请求
        </span>,
        null,
        "info",
      );
    }
  } catch (error) {
    addToast(
      <span>
        失败. 操作: 重试 {plugin.type} <em>{plugin.name}</em>
      </span>,
      error.parsedMsg,
      "warning",
    );
  }
  return success;
}
