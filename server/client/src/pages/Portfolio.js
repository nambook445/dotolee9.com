import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Portfolio() {
  const [isScroll, setIsScroll] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 0 ? setIsScroll(true) : setIsScroll(false);
    });
  }, [isScroll]);

  return (
    <Fragment>
      <Header isScroll={isScroll}>
        <Nav>
          <ul>
            <li>
              <a href="#">about</a>
            </li>
            <li>
              <a href="#">experience</a>
            </li>
            <li>
              <a href="#">project</a>
            </li>
            <li>
              <a href="#">contact</a>
            </li>
          </ul>
        </Nav>
      </Header>{' '}
      {/*header*/}
      <LandingPage>
        <Landing>
          <div className="text">
            <h4>portfolio</h4>
            <h1>
              Front
              <br />
              aadsf
            </h1>
          </div>
        </Landing>
      </LandingPage>
      {/*landing page*/}
      <About>
        <Container id="about">
          <div>
            <h4>01</h4>
            <h1>
              know
              <br /> About me
            </h1>
            <p className="p">
              Appropriately maintain standards compliant total linkage with cutting-edge action
              items. Enthusiastically create seamless synergy rather than excellent value. Quickly
              promote premium strategic theme areas vis-a-vis.
            </p>
            <p className="p">
              Appropriately maintain standards compliant total linkage with cutting-edge action
              items. Enthusiastically create seamless synergy rather than excellent value.
            </p>
          </div>
          <div>
            <div className="about-border">
              <img src="static/about-img.jpg" alt="" width="230" />
            </div>
          </div>
        </Container>
      </About>
      {/*About*/}
      <Experience>
        <Container id="experience">
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
                <div>
                  <p className="timeline-thumbnail">April 2016 - Present</p>
                  <h3>Geil,Danke! GmbH</h3>
                  <h4>eines Web-Studios</h4>
                  <p>
                    <strong>Projektmanagement mit Scrum</strong>
                    <br />
                    Ständiges Verbessern des agilen Entwicklungsprozesses beispielsweise durch
                    Grunt, Yeoman, GIT, JIRA und BrowserStack.
                  </p>
                </div>
              </li>
              <li className="timeline-li">
                <label></label>
                <div>
                  <p className="timeline-thumbnail">April 2016 - Present</p>
                  <h3>Geil,Danke! GmbH</h3>
                  <h4>eines Web-Studios</h4>
                  <p>
                    <strong>Projektmanagement mit Scrum</strong>
                    <br />
                    Ständiges Verbessern des agilen Entwicklungsprozesses beispielsweise durch
                    Grunt, Yeoman, GIT, JIRA und BrowserStack.
                  </p>
                </div>
              </li>
              <li className="timeline-li">
                <label></label>
                <div>
                  <p className="timeline-thumbnail">April 2016 - Present</p>
                  <h3>Geil,Danke! GmbH</h3>
                  <h4>eines Web-Studios</h4>
                  <p>
                    <strong>Projektmanagement mit Scrum</strong>
                    <br />
                    Ständiges Verbessern des agilen Entwicklungsprozesses beispielsweise durch
                    Grunt, Yeoman, GIT, JIRA und BrowserStack.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </Container>
      </Experience>
      <Project>
        <Container>
          <div>
            <h4>03</h4>
            <h1>
              My
              <br />
              Projects
            </h1>
          </div>
          <div>
            <div>
              <nav>
                <ul>
                  <li>
                    <a>all</a>
                  </li>
                  <li>
                    <a>all</a>
                  </li>
                  <li>
                    <a>all</a>
                  </li>
                  <li>
                    <a>all</a>
                  </li>
                  <li>
                    <a>all</a>
                  </li>
                  <li>
                    <a>all</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div>
            <a>
              <div>
                <div>
                  <div>
                    <span>
                      Photorealistic smartwatch<em>Photography</em>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </Container>
      </Project>
    </Fragment>
  );
}

const Header = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  z-index: 1030;
  background: ${(props) => (props.isScroll ? '#fff' : null)};
  border: ${(props) => (props.isScroll ? `1px solid #f3f3f3` : null)};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  ul {
    display: inline-block;
    padding: 19px;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
  }
  li {
    display: inline-block;
    margin: 10px 13px;
  }
  a {
    color: #444;
    display: inline-block;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 11px;
    font-weight: bold;
    font-family: 'Open Sans', sans-serif;
    &:hover {
      color: #337ab7;
    }
    &:active {
      color: #337ab7;
    }
  }
`;
// header

const LandingPage = styled.section`
  background: url(/static/bg.jpg);
  background-size: cover;
  height: 100vh;
  top: -85px;
  z-index: 10;
`;
const Landing = styled.div`
  display: grid;
  justify-content: start;
  align-items: center;
  margin: 0;
  padding: 0 5%;
  width: 100%;
  height: 100vh;
  .text h1 {
    display: inline-block;
    margin: 10px 0;
    font-family: 'Playfair Display', serif;
    font-size: 80px;
    line-height: 70px;
  }
  .text h4 {
    color: #425bb5;
    position: relative;
    margin: 10px 0 10px 40px;
    vertical-align: bottom;
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    text-transform: capitalize;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 700;
    ::before {
      background: #425bb5;
      display: block;
      position: absolute;
      width: 30px;
      height: 2px;
      top: 9px;
      left: -40px;
      content: '';
    }
  }
`;
// landin page

const About = styled.section`
  padding: 20vh 0;
  #about {
    grid-template-columns: 1fr 1fr;
  }
  .about-border img {
    width: 100%;
    height: 100%;
  }
  .about-border {
    display: block;
    position: relative;
    margin-left: 10%;
    ::before {
      display: block;
      position: absolute;
      border: 10px solid #425bb5;
      width: 100%;
      height: 400px;
      top: 40px;
      left: -10px;
      content: '';
      z-index: 1;
    }
  }
  .p {
    margin-top: 10%;
  }
`;
const Container = styled.div`
  display: grid;
  margin: 0 10%;
  h1 {
    display: inline-block;
    margin: 10px 0;
    font-family: 'Playfair Display', serif;
    font-size: 48px;
    line-height: 70px;
  }
  h4 {
    color: #425bb5;
    position: relative;
    margin: 10px 0 10px 40px;
    vertical-align: bottom;
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    text-transform: capitalize;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 700;
    ::before {
      background: #425bb5;
      display: block;
      position: absolute;
      width: 30px;
      height: 2px;
      top: 9px;
      left: -40px;
      content: '';
    }
  }
`;

const Experience = styled.section`
  padding: 20vh 0;
  background: #f3f3f3;
  #experience {
    grid-template-rows: auto;
    position: relative;
    h1 {
      margin-bottom: 30px;
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
      padding-left: 2rem;
    }

    .timeline-thumbnail {
      transition: box-shadow 0.5s ease-in 0.1s;
      background: #444;
      color: #fff;
      display: inline-block;
      font-size: 12px;
      font-weight: bold;
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
      margin: 0.5em 0.5em 0.5em -0.5em;
      width: 1em;
      height: 1em;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .timeline {
    list-style: none;
    ::before {
      background: #444;
      top: 0;
      position: absolute;
      width: 2px;
      height: 100%;
      content: '';
    }
  }
`;
const Project = styled.section`
  padding: 20vh 0;
`;
