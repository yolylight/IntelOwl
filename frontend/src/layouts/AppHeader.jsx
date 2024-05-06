import React from "react";
import axios from "axios";
import {
  Nav,
  Navbar,
  NavItem,
  Collapse,
  NavbarBrand,
  NavbarToggler,
  Button,
  UncontrolledPopover,
} from "reactstrap";
import { NavLink as RRNavLink, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdHome, MdShare } from "react-icons/md";
import {
  RiPlugFill,
  RiBookReadFill,
  RiGuideLine,
  RiTwitterXFill,
} from "react-icons/ri";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { TbReport } from "react-icons/tb";

// lib
import { NavLink, AxiosLoadingBar } from "@certego/certego-ui";

// constants
import {
  INTELOWL_DOCS_URL,
  PUBLIC_URL,
  VERSION,
  INTELOWL_TWITTER_ACCOUNT,
} from "../constants/environment";

// local
import UserMenu from "./widgets/UserMenu";
import NotificationPopoverButton from "../components/jobs/notification/NotificationPopoverButton";
import { useAuthStore } from "../stores/useAuthStore";
import { useGuideContext } from "../contexts/GuideContext";

const authLinks = (
  <>
    <NavItem>
      <NavLink className="d-flex-start-center" end to="/dashboard">
        <AiOutlineDashboard />
        <span className="ms-1" id="dashboard-title">
          仪表盘
        </span>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink className="d-flex-start-center" end to="/history">
        <TbReport />
        <span className="ms-1">历史</span>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink className="d-flex-start-center" to="/plugins">
        <RiPlugFill />
        <span className="ms-1">插件</span>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink className="d-flex-start-center" end to="/scan">
        <IoSearch />
        <span className="ms-1">扫描</span>
      </NavLink>
    </NavItem>
  </>
);

const guestLinks = (
  <>
    <NavItem>
      <RRNavLink
        id="login-btn"
        className="btn btn-sm btn-primary"
        end
        to="/login"
      >
        登录
      </RRNavLink>
    </NavItem>
    <NavItem className="ms-lg-2">
      <RRNavLink
        id="register-btn"
        className="btn btn-sm btn-accent-2"
        end
        to="/register"
      >
        注册
      </RRNavLink>
    </NavItem>
  </>
);

// eslint-disable-next-line react/prop-types
function RightLinks({ handleClickStart, isAuthenticated }) {
  const location = useLocation();
  const isRootPath = location.pathname === "/";
  return (
    <>
      {isRootPath && isAuthenticated && (
        <NavItem>
          <button
            type="button"
            className="d-flex-start-center btn text-gray"
            onClick={handleClickStart}
          >
            <RiGuideLine />
            <span className="ms-1">向导</span>
          </button>
        </NavItem>
      )}
      <NavItem>
        <a
          className="d-flex-start-center btn text-gray"
          href={INTELOWL_DOCS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiBookReadFill />
          <span className="ms-1">文档</span>
        </a>
      </NavItem>
      <Button id="social-button" size="sm" className="mx-2 btn-accent">
        <>
          <MdShare />
          <span className="ms-1">社交</span>
        </>
      </Button>
      <UncontrolledPopover
        target="social-button"
        placement="bottom"
        trigger="click"
        popperClassName="p-2 bg-dark"
      >
        <div className="d-flex-center flex-column">
          <div className="d-flex my-1">
            <a
              href={`https://twitter.com/${INTELOWL_TWITTER_ACCOUNT}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-social"
            >
              <RiTwitterXFill className="text-info" /> Follow @
              {INTELOWL_TWITTER_ACCOUNT}
            </a>
          </div>
          <div>
            <a
              href="https://github.com/intelowlproject"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-social my-1"
            >
              <FaGithub /> 连接Github{" "}
            </a>
          </div>
          <div>
            <a
              href="https://www.honeynet.org/gsoc/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-social my-1"
            >
              <FaGoogle className="text-accent" /> Honeynet on GSOC{" "}
            </a>
          </div>
          <div>
            <a
              href="https://gsoc-slack.honeynet.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-social my-1"
            >
              <img
                className="px-1"
                title="Honeynet"
                src={`${PUBLIC_URL}/icons/honeynet.ico`}
                alt="honeynet"
                width="24px"
                height="16px"
              />
              Honeynet Slack Chat{" "}
            </a>
          </div>
        </div>
      </UncontrolledPopover>
    </>
  );
}

function AppHeader() {
  console.debug("AppHeader rendered!");

  const { setGuideState } = useGuideContext();

  const handleClickStart = () => {
    setGuideState({ run: true, tourActive: true });
  };

  // local state
  const [isOpen, setIsOpen] = React.useState(false);

  // auth store
  const isAuthenticated = useAuthStore(
    React.useCallback((state) => state.isAuthenticated(), []),
  );

  return (
    <header className="sticky-top">
      {/* top loading bar */}
      <AxiosLoadingBar axiosInstance={axios} />
      {/* nav bar */}
      <Navbar dark expand="lg">
        <NavbarBrand tag={RRNavLink} to="/">
          <img
            src={`${PUBLIC_URL}/logo-negative-reduced.png`}
            width="128"
            alt="IntelOwl logo"
          />
          <small className="text-accent" style={{ fontFamily: "Pacifico" }}>
            {VERSION}
          </small>
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse navbar isOpen={isOpen}>
          {/* Navbar Left Side */}
          <Nav navbar>
            <NavItem>
              <NavLink className="d-flex-start-center" end to="/">
                <MdHome />
                <span className="ms-1">主页</span>
              </NavLink>
            </NavItem>
            {isAuthenticated && authLinks}
          </Nav>
          {/* Navbar Right Side */}
          <Nav navbar className="ms-auto d-flex align-items-center">
            <RightLinks
              handleClickStart={handleClickStart}
              isAuthenticated={isAuthenticated}
            />
            {/* Notifications Popover */}
            {isAuthenticated && (
              <NavItem>
                <NotificationPopoverButton />
              </NavItem>
            )}
            {!isAuthenticated ? guestLinks : <UserMenu />}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
}

export default AppHeader;
