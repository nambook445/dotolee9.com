import React from 'react';
import styled from 'styled-components';
import Container from './components/Container';
import { useScrollClipPath } from './hook';

const Experience = () => {
  const animatedItem = {
    0: useScrollClipPath('down', 0.5, 0),
    1: useScrollClipPath('down', 0.5, 0),
    2: useScrollClipPath('down', 0.5, 0)
  };
  return (
    <MyExperience id="experience">
      <Container className="experience">
        <div>
          <h4>02</h4>
          <h1>
            my
            <br />
            Experience
          </h1>
        </div>
        <div className="timeline-selector">
          <ul className="timeline">
            <li className="timeline-li">
              <label></label>
              <div {...animatedItem[0]}>
                <p className="timeline-thumbnail">April 2016 - Present</p>
                <h3>Geil,Danke! GmbH</h3>
                <h4>eines Web-Studios</h4>
                <p>
                  <strong>Projektmanagement mit Scrum</strong>
                  <br />
                  Ständiges Verbessern des agilen Entwicklungsprozesses beispielsweise durch Grunt,
                  Yeoman, GIT, JIRA und BrowserStack.
                </p>
              </div>
            </li>
            <li className="timeline-li">
              <label></label>
              <div {...animatedItem[1]}>
                <p className="timeline-thumbnail">April 2016 - Present</p>
                <h3>Geil,Danke! GmbH</h3>
                <h4>eines Web-Studios</h4>
                <p>
                  <strong>Projektmanagement mit Scrum</strong>
                  <br />
                  Ständiges Verbessern des agilen Entwicklungsprozesses beispielsweise durch Grunt,
                  Yeoman, GIT, JIRA und BrowserStack.
                </p>
              </div>
            </li>
            <li className="timeline-li">
              <label></label>
              <div {...animatedItem[2]}>
                <p className="timeline-thumbnail">April 2016 - Present</p>
                <h3>Geil,Danke! GmbH</h3>
                <h4>eines Web-Studios</h4>
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
