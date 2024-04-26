import axios from "axios";

import { addToast } from "@certego/certego-ui";

import { AUTH_BASE_URI } from "../../constants/apiURLs";

export async function registerUser(body) {
  try {
    const resp = await axios.post(`${AUTH_BASE_URI}/register`, body);
    return resp;
  } catch (err) {
    addToast("注册失败!", err.parsedMsg, "danger", true);
    return Promise.reject(err);
  }
}

export async function verifyEmail(body) {
  try {
    const resp = await axios.post(`${AUTH_BASE_URI}/verify-email`, body);
    addToast(
      "您的邮箱已验证!",
      null,
      "success",
      true,
    );
    return resp;
  } catch (err) {
    addToast("邮箱验证失败!", err.parsedMsg, "danger", true);
    return Promise.reject(err);
  }
}

export async function resendVerificationMail(body) {
  try {
    const resp = await axios.post(`${AUTH_BASE_URI}/resend-verification`, body);
    addToast("验证邮件已发送!", null, "success");
    return resp;
  } catch (err) {
    addToast("发送邮件失败!", err.parsedMsg, "danger", true);
    return Promise.reject(err);
  }
}

export async function requestPasswordReset(body) {
  try {
    const resp = await axios.post(
      `${AUTH_BASE_URI}/request-password-reset`,
      body,
    );
    addToast("邮件已发送!", null, "success");
    return resp;
  } catch (err) {
    addToast("邮件发送失败!", err.parsedMsg, "danger", true);
    return null;
  }
}

export async function resetPassword(body) {
  try {
    const resp = await axios.post(`${AUTH_BASE_URI}/reset-password`, body);
    addToast("密码重置成功!", null, "success", true);
    return resp;
  } catch (err) {
    addToast("密码重置失败!", err.parsedMsg, "danger", true);
    return Promise.reject(err);
  }
}

export async function checkConfiguration(body) {
  try {
    const resp = await axios.get(`${AUTH_BASE_URI}/configuration`, body);
    const { errors } = resp.data;
    if (errors) {
      return Promise.reject(errors);
    }
    return resp;
  } catch (err) {
    // this API always return 200, this catch should never ne triggered, but it's better to be safe
    return Promise.reject(err);
  }
}
