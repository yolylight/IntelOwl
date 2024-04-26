import "./Home.scss";

import React from "react";
import { Container } from "reactstrap";

import { ContentSection } from "@certego/certego-ui";

import { PUBLIC_URL, VERSION } from "../../constants/environment";

// constants
const versionText = VERSION;
const logoBgImg = `url('${PUBLIC_URL}/logo-negative.png')`;
const blogPosts = [
  {
    title: "IntelOwl: 版本 v4.0.0",
    subText: "Certego Blog: v4.0.0 Announcement",
    date: "1st July 2022",
    link: "https://www.certego.net/en/news/intel-owl-release-v4-0-0/",
  },
  {
    title: "IntelOwl: 版本 v3.0.0",
    subText: "Honeynet Blog: v3.0.0 Announcement",
    date: "13th September 2021",
    link: "https://www.honeynet.org/2021/09/13/intel-owl-release-v3-0-0/",
  },
  {
    title:
      "Intel Owl – OSINT 工具利用单一应用程序接口实现情报收集过程自动化",
    subText: "Daily Swig: Interview with Matteo Lodi and Eshaan Bansal",
    date: "18th August 2020",
    link: "https://portswigger.net/daily-swig/intel-owl-osint-tool-automates-the-intel-gathering-process-using-a-single-api",
  },
  {
    title: "新的一年，新的工具: Intel Owl",
    subText: "Certego Blog: First announcement",
    date: "2nd January 2020",
    link: "https://www.certego.net/en/news/new-year-new-tool-intel-owl/",
  },
];

// Component
export default function Home() {
  console.debug("Home rendered!");

  return (
    <>
      {/* BG Image */}
      <Container fluid id="home__bgImg" style={{ backgroundImage: logoBgImg }}>
        <h2
          id="home__versionText"
          className="text-accent"
          data-glitch={versionText}
        >
          {versionText}
        </h2>
      </Container>
      {/* Content */}
      <Container id="home__content" className="mt-2">
        <ContentSection className="bg-body shadow lead">
          Intel Owl 是一种开源情报或 OSINT 解决方案，可从单一 API 大规模获取有关特定文件、IP 或域的威胁情报数据。它集成了大量在线分析器和尖端恶意软件分析工具。它适用于需要单点查询特定文件或可观测信息的所有人.
        </ContentSection>
        <br />
        {/* blogposts */}
        <h5 className="text-gradient">IntelOwl News</h5>
        <ContentSection>
          {blogPosts.map(({ title, subText, date, link }) => (
            <ContentSection key={title} className="border-dark bg-body">
              <small className="text-muted float-end">{date}</small>
              <h5 className="text-secondary">{title}</h5>
              <p className="mb-2 text-muted">{subText}</p>
              <a
                className="link-ul-primary"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                阅读
              </a>
            </ContentSection>
          ))}
        </ContentSection>
      </Container>
    </>
  );
}
