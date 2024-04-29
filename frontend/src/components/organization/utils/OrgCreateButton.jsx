import React from "react";
import PropTypes from "prop-types";
import { Col, FormGroup, Label, Button, Spinner, Input } from "reactstrap";
import { Form, Formik } from "formik";
import { IoMdPersonAdd } from "react-icons/io";

import { PopupFormButton } from "@certego/certego-ui";

import { createOrganization } from "../orgApi";

// constants
const initialValues = {
  name: "",
};

// methods
const onValidate = (values) => {
  const minLength = 4;
  const maxLength = 32;
  const errors = {};
  if (!values.name) {
    errors.name = "该字段必填.";
  } else if (values.name.length < minLength) {
    errors.name = `该字段最小 ${minLength} 个字符`;
  } else if (values.name.length >= maxLength) {
    errors.name = `该字段最大${maxLength} 个字符.`;
  }
  return errors;
};

// Organization Create Form
function OrganizationCreateForm({ onFormSubmit }) {
  console.debug("OrganizationCreateForm rendered!");

  const onSubmit = React.useCallback(
    async (values, formik) => {
      try {
        await createOrganization(values);
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
            <Label className="required" for="orgforminput-name" md={3}>
              组织名称
            </Label>
            <Col md={6}>
              <Input
                autoFocus
                id="orgforminput-name"
                type="text"
                name="name"
                bsSize="sm"
                onChange={formik.handleChange}
              />
            </Col>
            <Col md={2}>
              <Button
                type="submit"
                id="orgforminput-submit"
                disabled={!(formik.isValid || formik.isSubmitting)}
                color="darker"
                size="sm"
                md={2}
              >
                {formik.isSubmitting && <Spinner size="sm" />}Create
              </Button>
            </Col>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
}

OrganizationCreateForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

function OrgCreateIcon() {
  return (
    <span>
      <IoMdPersonAdd className="me-1" /> 创建新组织
    </span>
  );
}

// Popover Button for organization create form
export function OrgCreateButton({ onCreate }) {
  return (
    <PopupFormButton
      id="orgcreateform-icon"
      popOverPlacement="bottom"
      Icon={OrgCreateIcon}
      Form={OrganizationCreateForm}
      onFormSuccess={onCreate}
      size="md"
    />
  );
}

OrgCreateButton.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
