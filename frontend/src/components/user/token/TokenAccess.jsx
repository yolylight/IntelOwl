import React from "react";
import { Alert, Row, Col, ButtonGroup } from "reactstrap";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { VscDebugDisconnect } from "react-icons/vsc";
import { IoMdAdd } from "react-icons/io";
import useAxios from "axios-hooks";

import {
  ContentSection,
  ErrorAlert,
  IconButton,
  DateHoverable,
  CopyToClipboardButton,
  Loader,
  confirm,
} from "@certego/certego-ui";

import { APIACCESS_BASE_URI, createNewToken, deleteToken } from "./tokenApi";

function GenerateIcon() {
  return (
    <span>
      生成&nbsp;
      <IoMdAdd />
    </span>
  );
}

export default function TokenAccess() {
  console.debug("APIAccess rendered!");

  const [{ data: respData, loading, error }, refetch] = useAxios(
    {
      url: APIACCESS_BASE_URI,
    },
    { useCache: false },
  );

  console.debug(`TokenAccess - respData: ${JSON.stringify(respData)}`);
  console.debug(`TokenAccess - error: ${JSON.stringify(error)}`);

  // local state
  const [tokenVisible, setTokenVisible] = React.useState(false);

  // callbacks
  const createTokenCb = React.useCallback(async () => {
    await createNewToken();
    // reload after 500ms
    setTimeout(refetch, 500);
  }, [refetch]);
  const deleteTokenCb = React.useCallback(async () => {
    const answer = await confirm({
      message: (
        <div>
          <p className="text-warning fst-italic">
            注意：这是一个不可逆的操作
          </p>
          <p>
            一旦删除，您将无法使用此 API 密钥访问 IntelOwl
            API. 不过，您可以生成一个新的.
          </p>
          你确定要继续吗 ?
        </div>
      ),
      confirmText: "是",
    });
    if (answer) {
      try {
        await deleteToken();
        // reload after 500ms
        setTimeout(refetch, 500);
      } catch (errorResponse) {
        // handled inside deleteToken
      }
    }
  }, [refetch]);

  return (
    <Loader
      loading={loading}
      error={error}
      // Normal render
      render={() => (
        <>
          {/* API key details */}
          <Row className="d-flex g-0">
            <Col sm={6} lg={3}>
              <small className="text-muted me-1">已创建</small>
              <DateHoverable
                id="apikey__created"
                value={respData?.created}
                format="hh:mm a MMM do, yyyy"
                title="令牌创建日期"
                showAgo
              />
            </Col>
          </Row>
          {/* API key toggler */}
          <Row className="mt-4 d-flex g-0">
            <Col md={8} lg={5} className="mx-auto">
              <ContentSection className="bg-darker d-flex-center flex-nowrap">
                {tokenVisible ? (
                  <CopyToClipboardButton
                    id="apiaccess__token"
                    text={respData?.key}
                    showOnHover
                  >
                    {respData?.key}
                  </CopyToClipboardButton>
                ) : (
                  <div className="blurry-text text-truncate">
                    tokentokentokentokentokentoken
                  </div>
                )}
                <ButtonGroup className="ms-auto" size="sm">
                  <IconButton
                    id="toggle-show-apikey-btn"
                    color="dark"
                    title={tokenVisible ? "隐藏API KEY" : "显示API Key"}
                    className="ms-2 border border-dark"
                    Icon={tokenVisible ? MdVisibility : MdVisibilityOff}
                    onClick={() =>
                      setTokenVisible((isTokenVisible) => !isTokenVisible)
                    }
                  />
                  <IconButton
                    id="delete-apikey-btn"
                    title="删除API key"
                    outline
                    color="danger"
                    className="border border-dark"
                    Icon={VscDebugDisconnect}
                    onClick={deleteTokenCb}
                  />
                </ButtonGroup>
              </ContentSection>
            </Col>
          </Row>
        </>
      )}
      // Error render (we catch 404 which means no API key exists)
      renderError={() =>
        error?.response?.status === 404 ? (
          <Alert color="dark" className="col-md-6 col-lg-3 mx-auto text-center">
            <h5 className="text-warning">无可用API Key</h5>
            <IconButton
              id="create-apikey-btn"
              color="tertiary"
              title="点击生成新API KEY"
              titlePlacement="bottom"
              size="sm"
              Icon={GenerateIcon}
              onClick={createTokenCb}
            />
          </Alert>
        ) : (
          <ErrorAlert error={error} />
        )
      }
    />
  );
}
