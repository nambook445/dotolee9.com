import React from 'react';
import styled from 'styled-components';
import Container from './components/Container';

const Contact = () => {
  return (
    <MyContact id="contact">
      <Container>
        <div>
          <h4>04</h4>
          <h1>Contact Me</h1>
        </div>
        <div className="contact-grid">
          <div>
            <h3> Mobile Number</h3>
            <p>010-3639-0393</p>
          </div>
          <div>
            <h3>Email</h3>
            <p>dotolee9@gmail.com </p>
          </div>
          <div>
            <h3>Social Network</h3>
            <ul className="icon-grid">
              <li>
                <a href="https://github.com/nambook445">
                  <img src="static/icons/github.svg" alt="github" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="static/icons/notion.svg" alt="notion" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="static/icons/slack.svg" alt="slack" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </MyContact>
  );
};

const MyContact = styled.section`
  padding: 20vh 0;
  background: #f3f3f3;
  .contact-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    margin-top: 7rem;
  }
  .contact-grid p,
  h3 {
    display: block;
  }
  .contact-grid h3 {
    margin-bottom: 2rem;
  }
  .icon-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    list-style: none;
  }
`;

export default Contact;
