import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, Alert } from "reactstrap";
import { MdInfoOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { INTELOWL_DOCS_URL } from "../../../constants/environment";

export function InviteOnlyAlert() {
  return (
    <Alert
      color="accent-2"
      id="inviteonly-info"
      className="col-12 px-1 text-center"
    >
      <h5 className="text-info">
        <MdInfoOutline size="1.15rem" />
        &nbsp;在下方注册，加入候补名单!
      </h5>
      <p>
        请注意，IntelOwl 是一个只接受邀请的信任组.
        注册后，我们的团队将通过您提供的电子邮件与您联系.
        <br />
        <span className="font-italic text-accent">
          我们建议您使用企业电子邮件地址而非个人电子邮件地址注册，以增加获得访问权限的机会.
        </span>
      </p>
    </Alert>
  );
}

export function AfterRegistrationModalAlert(props) {
  // modal state from props
  const { isOpen, setIsOpen } = props;
  const navigate = useNavigate();

  // callbacks
  const toggle = React.useCallback(() => {
    navigate("/");
    setIsOpen((open) => !open);
  }, [navigate, setIsOpen]);

  return (
    <Modal
      autoFocus
      centered
      zIndex="1050"
      size="lg"
      isOpen={isOpen}
      keyboard={false}
      backdrop="static"
      labelledBy="Registration successful modal"
    >
      <ModalHeader toggle={toggle}>注册成功! 🥳</ModalHeader>
      <ModalBody className="px-5">
        <>
          <section>
            <Alert color="success" className="text-center">
              <h3>感谢注册IntelOwl! 🤝</h3>
            </Alert>
          </section>
          <section className="mt-4">
            <strong className="h6">
              <u>下一步:</u>
            </strong>
            <ol className="mt-2">
              <li>
                验证您的电子邮件地址。我们已经向您发送了{" "}
                <abbr title="没有收到？不用担心，再次发送.">
                  链接
                </abbr>
                .
              </li>
              <li>我们的团队会尽快与您联系.</li>
            </ol>
          </section>
        </>
      </ModalBody>
    </Modal>
  );
}

export function ConfigurationModalAlert(props) {
  const { isOpen, setIsOpen, title } = props;
  const navigate = useNavigate();

  // callbacks
  const toggle = React.useCallback(() => {
    navigate("/");
    setIsOpen((open) => !open);
  }, [navigate, setIsOpen]);

  return (
    <Modal
      autoFocus
      centered
      zIndex="1050"
      size="lg"
      isOpen={isOpen}
      keyboard={false}
      backdrop="static"
      labelledBy="Configuration modal"
    >
      <ModalHeader toggle={toggle}>警告</ModalHeader>
      <ModalBody className="px-5">
        <>
          <section>
            <Alert color="warning" className="text-center">
              <h3>{title}</h3>
            </Alert>
          </section>
          <section className="mt-4">
            <p>
              如果您是管理员，请检查{" "}
              <a href={INTELOWL_DOCS_URL} target="_blank" rel="noreferrer">
                文档
              </a>{" "}
              并正确配置所有必要的变量.
            </p>
          </section>
        </>
      </ModalBody>
    </Modal>
  );
}

AfterRegistrationModalAlert.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

ConfigurationModalAlert.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
