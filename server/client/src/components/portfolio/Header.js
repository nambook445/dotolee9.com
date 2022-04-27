import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useScrollFadeIn } from './hook/';

const Header = () => {
  const [isScroll, setIsScroll] = useState(false);
  const animatedItem = {
    0: useScrollFadeIn('up', 1, 0.2)
  };
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 0 ? setIsScroll(true) : setIsScroll(false);
    });
  }, [isScroll]);
  return (
    <MyHeader {...animatedItem[0]} isScroll={isScroll}>
      <Nav>
        <ul>
          <li>
            <a href="#about">about</a>
          </li>
          <li>
            <a href="#experience">experience</a>
          </li>
          <li>
            <a href="#project">project</a>
          </li>
          <li>
            <a href="#contact">contact</a>
          </li>
        </ul>
      </Nav>
    </MyHeader>
  );
};

const MyHeader = styled.header`
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
    padding: 1rem;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
  }
  li {
    display: inline-block;
    margin: 1rem 1.5rem;
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

export default Header;
