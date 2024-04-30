import axios from "axios";

import { addToast } from "@certego/certego-ui";

import { PLUGIN_CONFIG_URI } from "../../../constants/apiURLs";

async function createCustomConfig(data) {
  console.debug("createCustomConfig - data:");
  console.debug(data);
  try {
    const resp = await axios.post(PLUGIN_CONFIG_URI, data);
    addToast("数据已成功发布", null, "success", true);
    return resp;
  } catch (error) {
    if (
      error?.response.status === 400 &&
      error.response?.data?.errors?.non_field_errors[0].endsWith(
        "已经存在.",
      )
    )
      addToast("失败!", "配置已存在!", "danger", true);
    else addToast("失败!", error.parsedMsg.toString(), "danger", true);
    return Promise.reject(error);
  }
}

async function updateCustomConfig(value, id) {
  console.debug("updateCustomConfig - value:");
  console.debug(value);
  try {
    const resp = await axios.patch(`${PLUGIN_CONFIG_URI}/${id}`, { value });
    addToast("数据上传成功", null, "success", true);
    return resp;
  } catch (error) {
    addToast("失败!", error.parsedMsg.toString(), "danger", true);
    return Promise.reject(error);
  }
}

async function deleteCustomConfig(id) {
  console.debug("deleteCustomConfig - id:");
  console.debug(id);
  try {
    const resp = await axios.delete(`${PLUGIN_CONFIG_URI}/${id}`);
    addToast("数据删除成功", null, "success", true);
    return resp;
  } catch (error) {
    addToast("失败!", error.parsedMsg.toString(), "danger", true);
    return Promise.reject(error);
  }
}

export {
  PLUGIN_CONFIG_URI,
  createCustomConfig,
  updateCustomConfig,
  deleteCustomConfig,
};
