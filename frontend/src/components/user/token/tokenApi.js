import axios from "axios";

import { addToast } from "@certego/certego-ui";

import { APIACCESS_BASE_URI } from "../../../constants/apiURLs";

// API Access

async function createNewToken() {
  try {
    const resp = await axios.post(APIACCESS_BASE_URI);
    addToast("为您生成新的 API 密钥!", null, "success", true);
    return resp;
  } catch (error) {
    addToast("失败!", error.parsedMsg.toString(), "danger", true);
    return Promise.reject(error);
  }
}

async function deleteToken() {
  try {
    const resp = await axios.delete(APIACCESS_BASE_URI);
    addToast("API密钥已删除!", null, "success", true);
    return resp;
  } catch (error) {
    addToast("失败!", error.parsedMsg.toString(), "danger", true);
    return Promise.reject(error);
  }
}

export { APIACCESS_BASE_URI, createNewToken, deleteToken };
