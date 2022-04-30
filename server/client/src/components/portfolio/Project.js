import React, { useState } from 'react';
import { useScrollClipPath } from './hook';
//react
import styled from 'styled-components';
import Container from './components/Container';
//styled components
import Modal from './components/Modal';

const Project = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const animatedItem = {
    0: useScrollClipPath('up', 1, 0)
  };

  console.log(modalOpen);

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
    <MyProject id="project">
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
                        href="#project"
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

        <div className="item-container" {...animatedItem[0]}>
          {ProjectList.map((item, index) => {
            return (
              <div
                className="project-item"
                key={index}
                onClick={() => {
                  setModalOpen(!modalOpen);
                }}
              >
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
              </div>
            );
          })}
        </div>
      </Container>
      <Modal
        visible={modalOpen}
        onChangeState={() => {
          setModalOpen();
        }}
      />
    </MyProject>
  );
};

const MyProject = styled.section`
  padding: 20vh 0;
  display: relative;
  nav {
    display: flex;
    align-items: center;
    margin: 1.5rem 0;
  }

  ul {
    padding: 1rem 0;
    line-height: 1.5em;
  }
  ul li:first-child {
    padding-left: 0;
  }

  li {
    display: inline-block;
    margin-right: 1.5rem;
  }
  .active-li {
    margin-right: 1.5rem;
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
      padding: 0 1.5rem;
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
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
  .item-container .project-item {
    display: block;
    position: relative;
    overflow: hidden;
    cursor: pointer;
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

export default Project;
