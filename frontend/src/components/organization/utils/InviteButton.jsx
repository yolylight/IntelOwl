import React from "react";
import PropTypes from "prop-types";
import { Col, FormGroup, Label, Button, Spinner, Input } from "reactstrap";
import { Form, Formik } from "formik";
import { IoMdPersonAdd } from "react-icons/io";

import { PopupFormButton } from "@certego/certego-ui";

import { sendInvite } from "../orgApi";

// constants
const initialValues = {
  username: "",
};

// methods
const onValidate = (values) => {
  const minLength = 3;
  const maxLength = 16;
  const errors = {};
  if (!values.username) {
    errors.username = "字段必需.";
  } else if (values.username.length < minLength) {
    errors.username = `字段最小 ${minLength} 个字符`;
  } else if (values.username.length >= maxLength) {
    errors.username = `字段最多 ${maxLength} 个字符.`;
  }
  return errors;
};

// Invitation Form
function InvitationForm({ onFormSubmit }) {
  console.debug("InvitationForm rendered!");

  const onSubmit = React.useCallback(
    async (values, formik) => {
      try {
        await sendInvite(values);
        onFormSubmit();
      } catch (error) {
        // error was handled inside sendInvite
      } finally {
        formik.setSubmitting(false);
      }
    },
    [onFormSubmit],
  );

  return (
    <Formik
      initialValues={initialValues}
      validate={onValidate}
      onSubmit={onSubmit}
      validateOnChange
    >
      {(formik) => (
        <Form className="mx-2 my-3">
          <FormGroup row className="d-flex flex-wrap">
            <Label className="required" for="forminput-username" md={4}>
              用户&apos;s 用户名
            </Label>
            <Col md={5}>
              <Input
                autoFocus
                id="forminput-username"
                type="text"
                name="username"
                onChange={formik.handleChange}
              />
            </Col>
            <Col md={2}>
              <Button
                type="submit"
                id="forminput-submit"
                disabled={!(formik.isValid || formik.isSubmitting)}
                color="darker"
                size="sm"
                md={2}
              >
                {formik.isSubmitting && <Spinner size="sm" />}发送
              </Button>
            </Col>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
}

// Popover Button for invitation form
export function InviteButton({ onCreate }) {
  return (
    <PopupFormButton
      id="invitationform-icon"
      title="邀请用户"
      titlePlacement="right"
      Icon={IoMdPersonAdd}
      Form={InvitationForm}
      onFormSuccess={onCreate}
      popOverPlacement="bottom"
      outline
      color="info"
      className="border border-tertiary"
    />
  );
}

InvitationForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

InviteButton.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
