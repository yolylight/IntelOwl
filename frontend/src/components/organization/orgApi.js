import axios from "axios";

import { addToast } from "@certego/certego-ui";

import { BASE_URI_INVITATION, BASE_URI_ORG } from "../../constants/apiURLs";

// ORGANIZATION

async function createOrganization(body) {
  try {
    const resp = await axios.post(BASE_URI_ORG, body);
    addToast(
      `你现在是组织 ${resp?.data?.name} 的拥有者.`,
      null,
      "success",
      true,
    );
    return resp;
  } catch (error) {
    addToast("失败!", error.parsedMsg, "danger", true);
    return Promise.reject(error);
  }
}

async function deleteOrganization(orgName) {
  try {
    const resp = await axios.delete(BASE_URI_ORG);
    addToast(
      `组织 ${orgName} 已删除.`,
      null,
      "success",
      true,
      6000,
    );
    return resp;
  } catch (error) {
    addToast("失败!", error.parsedMsg, "danger", true);
    return Promise.reject(error);
  }
}

async function removeMemberFromOrg(username) {
  try {
    const resp = await axios.post(`${BASE_URI_ORG}/remove_member`, {
      username,
    });
    addToast(
      `用户 @${username} 已被从成员移除.`,
      null,
      "success",
      true,
    );
    return resp;
  } catch (error) {
    addToast("失败!", error.parsedMsg, "danger", true);
    return Promise.reject(error);
  }
}

async function leaveOrganization(orgName) {
  try {
    const resp = await axios.post(`${BASE_URI_ORG}/leave`);
    addToast(
      `你不再是组织${orgName} 的成员.`,
      null,
      "success",
      true,
    );
    return resp;
  } catch (error) {
    addToast("失败!", error.parsedMsg, "danger", true);
    return Promise.reject(error);
  }
}

async function promoteUserAdmin(username) {
  try {
    const resp = await axios.post(`${BASE_URI_ORG}/promote_admin`, {
      username,
    });
    addToast(`用户 @${username}现在是管理员.`, null, "success", true);
    return resp;
  } catch (error) {
    addToast("失败!", error.parsedMsg, "danger", true);
    return Promise.reject(error);
  }
}

async function removeUserAdmin(username) {
  try {
    const resp = await axios.post(`${BASE_URI_ORG}/remove_admin`, { username });
    addToast(
      `用户 @${username} 已被从管理员移除.`,
      null,
      "info",
      true,
    );
    return resp;
  } catch (error) {
    addToast("错误!", error.parsedMsg, "danger", true);
    return Promise.reject(error);
  }
}

// INVITATION

async function sendInvite(body) {
  try {
    const resp = await axios.post(`${BASE_URI_ORG}/invite`, body);
    addToast("邀请已发送!", null, "success", true);
    return resp;
  } catch (error) {
    addToast("邀请失败!", error.parsedMsg, "danger", true);
    return Promise.reject(error);
  }
}

async function acceptInvitation(invId, orgName) {
  try {
    const resp = await axios.post(`${BASE_URI_INVITATION}/${invId}/accept`);
    addToast(
      "祝贺!",
      `你现在是组织 ${orgName} 的成员`,
      "success",
      true,
      6000,
    );
    return resp;
  } catch (error) {
    addToast("失败!", error.parsedMsg, "danger", true);
    return Promise.reject(error);
  }
}

async function declineInvitation(invId, orgName) {
  try {
    const resp = await axios.post(`${BASE_URI_INVITATION}/${invId}/decline`);
    addToast(
      `组织 ${orgName} 的邀请已被拒绝.`,
      null,
      "info",
      true,
    );
    return resp;
  } catch (error) {
    addToast("错误!", error.parsedMsg, "danger", true);
    return Promise.reject(error);
  }
}

async function deleteInvitation(invId, username) {
  try {
    const resp = await axios.delete(`${BASE_URI_INVITATION}/${invId}`);
    addToast(
      `邀请用户 @${username} 的请求已删除.`,
      null,
      "success",
      true,
    );
    return resp;
  } catch (error) {
    addToast("失败!", error.parsedMsg, "danger", true);
    return Promise.reject(error);
  }
}

export {
  BASE_URI_INVITATION,
  BASE_URI_ORG,
  createOrganization,
  deleteOrganization,
  removeMemberFromOrg,
  leaveOrganization,
  sendInvite,
  acceptInvitation,
  declineInvitation,
  deleteInvitation,
  promoteUserAdmin,
  removeUserAdmin,
};
