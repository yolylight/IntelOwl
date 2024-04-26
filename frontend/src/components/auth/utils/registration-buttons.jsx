import React from "react";
// import PropTypes from "prop-types";
import { Alert, PopoverBody } from "reactstrap";
import { IoMail } from "react-icons/io5";
import { PopupFormButton } from "@certego/certego-ui";
import EmailForm from "./EmailForm";
import { resendVerificationMail, requestPasswordReset } from "../authApi";

function Icon(text) {
  return (
    <small className="d-flex-center standout">
      <IoMail />
      &nbsp;
      <span>{text}</span>
    </small>
  );
}

function FormPopoverBody(formProps, text, api) {
  return (
    <PopoverBody>
      <Alert className="mb-4 text-wrap" color="secondary">
        <IoMail />
        &nbsp;{text}
      </Alert>
      <EmailForm
        className="col-lg-6 col-sm-12"
        apiCallback={api}
        {...formProps}
      />
    </PopoverBody>
  );
}

function EmailIcon() {
  return Icon("需要验证Email?");
}

function EmailFormPopoverBody(formProps) {
  return FormPopoverBody(
    formProps,
    "我们将向您发送电子邮件，说明如何验证您的电子邮件地址.",
    resendVerificationMail,
  );
}

// Popover Button for "Request Verification Email?"
export function ResendVerificationEmailButton() {
  return (
    <PopupFormButton
      id="reqverificationemail-iconbtn"
      popOverPlacement="top-start"
      Icon={EmailIcon}
      Form={EmailFormPopoverBody}
      size="sm"
      outline
      className="border-0"
    />
  );
}

function PasswordIcon() {
  return Icon("忘记密码?");
}

function PasswordFormPopoverBody(formProps) {
  return FormPopoverBody(
    formProps,
    "我们将向您发送一封电子邮件，说明如何重置密码.",
    requestPasswordReset,
  );
}

// Popover Button for "Forgot Password?"
export function ForgotPasswordButton() {
  return (
    <PopupFormButton
      id="requestpasswordreset-iconbtn"
      popOverPlacement="top-start"
      Icon={PasswordIcon}
      Form={PasswordFormPopoverBody}
      size="sm"
      outline
      className="border-0"
    />
  );
}
