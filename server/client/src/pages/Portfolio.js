import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Portfolio() {
  const [isScroll, setIsScroll] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 0 ? setIsScroll(true) : setIsScroll(false);
    });
  }, [isScroll]);
  const ProjectNav = [
    { title: 'ALL' },
    { title: 'PHOTOGRAPHY' },
    { title: 'LOGO' },
    { title: 'GRAPHICS' },
    { title: 'ADVERTISING' },
    { title: 'FASHION' }
  ];
  const ProjectList = [
    { title: '01', category: 'ALL' },
    { title: '02', category: 'PHOTOGRAPHY' },
    { title: '03', category: 'LOGO' },
    { title: '04', category: 'GRAPHICS' },
    { title: '05', category: 'ADVERTISING' },
    { title: '06', category: 'FASHION' }
  ];

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
      {/* Experience */}
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
                  {ProjectNav.map((item, index) => {
                    const active = index === activeItem ? 'active' : null;
                    return (
                      <li className={`${active}-li`}>
                        <a
                          key={index}
                          className={active}
                          onClick={() => {
                            setActiveItem(index);
                          }}
                          href="#"
                        >
                          {item.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
          <div className="item-container">
            {ProjectList.map((item, index) => {
              return (
                <a key={index} href="#">
                  <img src="static/01.jpg" alt="project" />
                  <div clasName="item-hover">
                    <div className="item-info">
                      <div id="project-name">
                        <p>{item.title}</p>
                      </div>
                      <div id="project-category">
                        <p>{item.category}</p>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </Container>
      </Project>
      {/* Project */}
      <Contact>
        <Container>
          <div>
            <h4>04</h4>
            <h1>Contact Me</h1>
          </div>
        </Container>
      </Contact>
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
  padding: 0 10%;
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
      top: 14px;
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
  margin: 0 5%;
  padding: 0 20px;
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
      top: 13px;
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
      margin: 0.5em 0.5em 0.5em 0.5em;
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
const Project = styled.section`
  padding: 20vh 0;
  nav {
    display: flex;
    align-items: center;
    margin: 20px 0;
  }

  ul {
    padding: 10px 0;
    line-height: 1.5em;
  }
  ul li:first-child {
    padding-left: 0;
  }

  li {
    display: inline-block;
    margin-right: 20px;
  }
  .active-li {
    margin-right: 20px;
  }
  li a {
    display: inline-block;
    color: #60606e;
    font-size: 12px;
    transition: all 0.2s ease-in-out 0.2s;
    font-weight: bold;
    height: 2em;
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    text-decoration: none;
    &.active {
      background: #425bb5;
      padding: 0 20px;
      color: #f3f3f3;
    }
    &:not(.active):hover {
      color: #425bb5;
    }
  }
  .item-container {
    display: grid;
    gap: 2rem;
    padding: 0;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .item-container a {
    display: block;
    position: relative;
    overflow: hidden;
    &:hover {
      .item-info,
      .item-info #project-name,
      .item-info #project-category {
        opacity: 1;
      }
      .item-info #project-name,
      .item-info #project-category {
        transform: translateY(0%);
      }
    }
  }
  .item-hover {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform: translateY(100%);
  }
  .item-info {
    position: absolute;
    display: grid;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-items: center;
    transform: translateY(-100%);
    transition: all 1s ease-in-out;
    background: #425bb5;
    color: #333;
    width: 100%;
    height: 100%;
    font-weight: bold;
    opacity: 0;
  }
  .item-info #project-name {
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: end;
    width: 100%;
    height: 100%;
    font-size: 18px;
    background: #425bb5;
    border-bottom: 1px solid #425bb5;
    transform: translateY(-100%);
    transition: all 0.3s ease-in-out 0.3s;
    opacity: 0;
    p {
      display: inline-block;
      margin-bottom: 10%;
    }
  }
  .item-info #project-category {
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: start;
    width: 100%;
    height: 100%;
    font-style: normal;
    background: #425bb5;
    border-top: none;
    transform: translateY(100%);
    transition: all 0.35s ease-in-out 0.35s;
    font-size: 10px;
    letter-spacing: 2px;
    opacity: 0;
    p {
      display: inline-block;
      margin-top: 10%;
    }
  }
`;
const Contact = styled.section`
  padding: 20vh 0;
  background: #f3f3f3;
`;
