# 포트폴리오 페이지
## 소개
React와 Styled-Components로 작성한 포트폴리오 웹페이지입니다.
## 사용한 기술
  * CSS : Grid, Flex, Position, Animaintion, 가상선택자, Active, Hover
  * React hook : Custom hook


  스크롤 위치를 기반으로 transform Animation
  ```
  import { useRef, useEffect, useCallback } from 'react';

const useScrollClipPath = (direction = 'left', duration = 1, delay = 0) => {
  const element = useRef();

  const handleClipPath = (name) => {
    switch (name) {
      case 'up':
        return 'inset(100% 0 0 0)';
      case 'down':
        return 'inset(0 0 100% 0)';
      case 'left':
        return 'inset(0 100% 0 0)';
      case 'right':
        return 'inset(0 0 0 100%)';
      default:
        return;
    }
  };

  const onScroll = useCallback(
    ([entry]) => {
      const { current } = element;
      if (entry.isIntersecting) {
        current.style.transitionProperty = 'transform, clip-path';
        current.style.transitionDuration = `${duration * 1.5}s, ${duration}s`;
        current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
        current.style.transitionDelay = `${delay}s`;
        current.style.transform = 'scale(1)';
        current.style.clipPath = 'inset(0 0 0 0)';
      }
    },
    [delay, duration]
  );

  useEffect(() => {
    let observer;

    if (element.current) {
      observer = new IntersectionObserver(onScroll, { threshold: 0.35 });
      observer.observe(element.current.parentNode);
    }

    return () => observer && observer.disconnect();
  }, [onScroll]);

  return {
    ref: element,
    style: {
      transform: 'scale(1.2)',
      clipPath: handleClipPath(direction)
    }
  };
};

export default useScrollClipPath;
```
Fade In Animation
```
import { useRef, useEffect, useCallback } from 'react';

const useScrollFadeIn = (direction = 'up', duration = 1, delay = 0) => {
  const element = useRef();
  const handleDirection = (name) => {
    switch (name) {
      case 'up':
        return 'translate3d(0, 50%, 0)';
      case 'right':
        return 'translate3d(-50%, 0, 0)';
      case 'down':
        return 'translate3d(0, -50%, 0)';
      case 'left':
        return 'translate3d(50%, 0, 0)';
      default:
        return;
    }
  };

  const onScroll = useCallback(
    ([entry]) => {
      const { current } = element;
      if (entry.isIntersecting) {
        current.style.transitionProperty = 'all';
        current.style.transtitionDuration = `${duration}s`;
        current.style.transitionTimingFunction = `cubic-bezier(0, 0, 0.2, 1)`;
        current.style.transitionDelay = `${delay}s`;
        current.style.opacity = 1;
        current.style.transform = 'translate3d(0, 0, 0)';
      }
    },
    [delay, duration]
  );

  useEffect(() => {
    let observer;
    if (element.current) {
      observer = new IntersectionObserver(onScroll, { threshold: 0.1 });
      observer.observe(element.current);
    }
    return () => observer && observer.disconnect();
  }, [onScroll]);

  return {
    ref: element,
    style: { opacity: 0, transform: handleDirection(direction) }
  };
};

export default useScrollFadeIn;
```
React hook을 사용한 Project 컴포넌트
```
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

  const ProjectNav = [{ title: 'JavaScript' }, { title: 'CSS' }, { title: 'TypeScript' }];
  const ProjectList = [
    { title: '01', category: '100일 글쓰기 챌린지', image: 'static/mainpage.png' },
    { title: '02', category: '포트폴리오 페이지', image: 'static/landingpage.png' },
    { title: '03', category: 'TypeScript', image: 'static/01.jpg' }
  ];
  return (
    <MyProject id="project">
      <Container>
        <div>
          <h4>03</h4>
          <h1>
            <div>My</div>
            <div>Projects</div>
          </h1>
        </div>
        <div>
          <div>
            <nav>
              <ul>
                {ProjectNav.map((item, index) => {
                  const active = index === activeItem ? 'active' : null;
                  return (
                    <li key={index} className={`${active}-li`}>
                      <a
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
                  setActiveItem(index);
                }}
              >
                <img src={item.image} alt={item.category} />
                <div className="item-hover">
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
        activeItem={activeItem}
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
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
 .item-container img {
    height: 100%;
    width: 100%;
  }
  .item-container .project-item {
    display: block;
    min-height: 354.67px;
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

```

##참조
[HTML Template](http://ahmedessa.net/resume/index.html)
