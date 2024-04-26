import { PASSWORD_REGEX, EMAIL_REGEX } from "../../../constants/regexConst";
import { RECAPTCHA_SITEKEY } from "../../../constants/environment";
import { HACKER_MEME_STRING } from "../../../constants/miscConst";

export function ComparePassword(password, confirmPassword) {
  const errors = {};
  if (
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password !== confirmPassword
  ) {
    errors.password = "密码不匹配.";
    errors.confirmPassword = "密码不匹配.";
  }
  return errors;
}

export function PasswordValidator(password) {
  const errors = {};
  if (!password) {
    errors.password = "必需";
  } else if (password.length < 12) {
    errors.password = "至少12字符";
  } else if (!PASSWORD_REGEX.test(password)) {
    errors.password =
      "密码完全是数字或包含特殊字符";
  }
  return errors;
}

export function UserFieldsValidator(field, value) {
  const errors = {};
  // text fields
  if (!value) {
    errors[field] = "必需";
  } else if (value.length > 15) {
    errors[field] = "最多15字符";
  } else if (value.length < 4) {
    errors[field] = "最少4个字符";
  }
  return errors;
}

export function UsernameValidator(username) {
  const errors = UserFieldsValidator("username", username);
  if (
    ["administrator", "admin", "certego", "hacker"].indexOf(username) !== -1
  ) {
    errors.username = HACKER_MEME_STRING;
  }
  return errors;
}

export function ProfileValidator(field, value) {
  const errors = {};
  // text fields
  if (!value) {
    errors[field] = "必需";
  } else if (value.length > 30) {
    errors[field] = "最多30字符";
  } else if (value.length < 3) {
    errors[field] = "最少3字符";
  }
  return errors;
}

export function EmailValidator(email) {
  const errors = {};
  if (!email) {
    errors.email = "必需";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "邮件格式错误";
  }
  return errors;
}

export function RecaptchaValidator(recaptcha) {
  const errors = {};
  if (recaptcha === "noKey" && RECAPTCHA_SITEKEY) {
    errors.recaptcha = "必需";
  }
  return errors;
}
