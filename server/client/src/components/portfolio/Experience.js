import React from 'react';
import styled from 'styled-components';
import Container from './components/Container';
import { useScrollClipPath } from './hook';

const Experience = () => {
  const animatedItem = {
    0: useScrollClipPath('down', 0.5, 0),
    1: useScrollClipPath('down', 0.5, 0),
    2: useScrollClipPath('down', 0.5, 0),
    3: useScrollClipPath('down', 0.5, 0)
  };
  return (
    <MyExperience id="experience">
      <Container className="experience">
        <div>
          <h4>02</h4>
          <h1>
            <div>My</div>
            <div>Experience</div>
          </h1>
        </div>
        <div className="timeline-selector">
          <ul className="timeline">
            <li className="timeline-li">
              <label></label>
              <div {...animatedItem[0]}>
                <p className="timeline-thumbnail">December 2021 - April 2022</p>
                <h3>100일 글쓰기 챌린지</h3>
                <h4>web application</h4>
                <p>
                  <strong>웹서비스 전반에 대한 이해</strong>
                  <br />
                  MUI, React, Redux, Axios, NodeExpress, Passport, MySQL, AWS, Nginx, HTTPS, ESlint,
                  Git을 이용하여 서비스 구축했습니다. 하나에 유기체로서 동작하는 웹서비스에 대하여 나름의
                  프로토타입을 갖게 됐습니다.
                </p>
              </div>
            </li>
            <li className="timeline-li">
              <label></label>
              <div {...animatedItem[1]}>
                <p className="timeline-thumbnail">April 2022</p>
                <h3>포트폴리오 페이지</h3>
                <h4>react와 Styled-Components로 만든 페이지</h4>
                <p>
                  <strong>Layout과 Component Styling</strong>
                  <br />
                  MUI를 사용하지 않고, styled-components를 이용해 UI와 Animation을 구현했습니다.
                </p>
              </div>
            </li>
            <li className="timeline-li">
              <label></label>
              <div {...animatedItem[2]}>
                <p className="timeline-thumbnail">May 2022</p>
                <h3>모던 자바스크립트 Deep Dive</h3>
                <h4>JavaScript 책</h4>
                <p>
                  <strong>자바스크립트의 기본 개념과 동작 원리</strong>
                  <br />
                  JavaScript 동작원리와 ESNEXT에 추가된 문법을 공부했습니다. 이를 바탕으로 리펙토링을 진행하였습니다.
                </p>
              </div>
            </li>
            <li className="timeline-li">
              <label></label>
              <div {...animatedItem[3]}>
                <p className="timeline-thumbnail">May 2022 - Present</p>
                <h3>TypeScript</h3>
                <h4>카카오 API를 이용한 도서검색 어플리캐이션</h4>
                <p>
                  <strong>Projektmanagement mit Scrum</strong>
                  <br />
                  Ständiges Verbessern des agilen Entwicklungsprozesses beispielsweise durch Grunt,
                  Yeoman, GIT, JIRA und BrowserStack.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </Container>
    </MyExperience>
  );
};

const MyExperience = styled.section`
  padding: 20vh 0;
  background: #f3f3f3;
  .experience {
    grid-template-rows: auto;
    position: relative;
    h1 {
      margin-bottom: 2rem;
    }
    .timeline-selector {
      display: block;
      position: relative;
      ::before {
        content: '';
        height: 100px;
        width: 100%;
      }
    }
    .timeline-li {
      h4 {
        margin: 0.5rem 0 0.5rem 40px;
      }
      p {
        margin-bottom: 0.5rem;
      }
      &:hover label {
        transform: rotate(-45deg);
        background: #425bb5;
      }
      &:hover .timeline-thumbnail {
        box-shadow: inset 40em 0 0 0 #425bb5;
      }
    }
    li {
      display: block;
      position: relative;
      padding-left: 3em;
    }

    .timeline-thumbnail {
      transition: box-shadow 0.5s ease-in 0.1s;
      background: #444;
      color: #fff;
      display: inline-block;
      font-size: 12px;
      font-weight: bold;
      margin-top: 0.5em;
      margin-bottom: 1.2em;
      padding: 0.25em 1em 0.2em 1em;
      box-shadow: inset 0 0 0 0em #425bb5;
    }
    label {
      transition: transform 0.2s ease-in;
      transform: rotate(45deg);
      background: #425bb5;
      display: inline-block;
      outline: 10px solid #f3f3f3;
      margin: 0.5em 0.5em 1em 0.5em;
      width: 1em;
      height: 1em;
      position: absolute;
      top: 0;
      left: 1px;
    }
  }
  .timeline {
    list-style: none;
    ::before {
      background: #444;
      top: 0;
      margin-left: 1em;
      position: absolute;
      width: 2px;
      height: 100%;
      content: '';
    }
  }
`;

export default Experience;
