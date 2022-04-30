import React from 'react';
import styled from 'styled-components';
import Container from './components/Container';
import { useScrollClipPath } from './hook';

const About = () => {
  const animatedItem = {
    0: useScrollClipPath('left', 0.5, 0),
    1: useScrollClipPath('right', 0.5, 0)
  };
  return (
    <MyAbout id="about">
      <Container className="about">
        <div {...animatedItem[1]}>
          <h4>01</h4>
          <h1>
            know
            <br /> About me
          </h1>
          <p className="p">
            Appropriately maintain standards compliant total linkage with cutting-edge action items.
            Enthusiastically create seamless synergy rather than excellent value. Quickly promote
            premium strategic theme areas vis-a-vis.
          </p>
          <p className="p">
            Appropriately maintain standards compliant total linkage with cutting-edge action items.
            Enthusiastically create seamless synergy rather than excellent value.
          </p>
        </div>
        <div>
          <div className="about-border">
            <img {...animatedItem[0]} src="static/about-img.jpg" alt="" width="230" />
          </div>
        </div>
      </Container>
    </MyAbout>
  );
};

const MyAbout = styled.section`
  padding: 20vh 0;
  .about {
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 10%;
  }
  .about-border img {
    width: 100%;
    height: 100%;
  }
  .about-border {
    display: block;
    position: relative;
    ::before {
      display: block;
      position: absolute;
      border: 10px solid #425bb5;
      width: 100%;
      height: 50%;
      top: 10%;
      left: -5%;
      content: '';
      z-index: 1;
    }
  }
  .p {
    margin-top: 1rem;
  }
`;

export default About;
