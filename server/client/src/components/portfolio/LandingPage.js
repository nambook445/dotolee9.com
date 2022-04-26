import React from 'react';
import styled from 'styled-components';

const LandingPage = () => {
  return (
    <MyLanding>
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
    </MyLanding>
  );
};
const MyLanding = styled.section`
  background: url(/static/bg.jpg);
  background-size: cover;
  height: 100vh;
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
    margin-top: 1rem;
    font-family: 'Playfair Display', serif;
    font-size: 4.5rem;
    line-height: 70px;
  }
  .text h4 {
    color: #425bb5;
    position: relative;
    margin: 1rem 0 1rem 40px;
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

export default LandingPage;
