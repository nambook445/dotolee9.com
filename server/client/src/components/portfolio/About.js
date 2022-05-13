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
            <div>Know</div>
            <div>About me</div>
          </h1>
          <p className="p">
            &nbsp;&nbsp;신입 프론트엔드 개발자를 지망하는 박승훈입니다. 저는 독서토론 모임을 도합
            4년간 운영,참여할 정도로 인문학에 관심이 많고, 축구를 좋아하여 축구팀 활동도 10년간
            꾸준히 이어가고있습니다.&nbsp;
            <strong>
              이 꾸준함과 자기주도 학습경험을 통해 지금은 개발자로서 갖춰야 할 역량을 키워나가며
              가치있는 서비스를 만들어 내기 위해 고민하고 있습니다.
            </strong>
          </p>
          <p className="p">
            &nbsp;&nbsp;<strong>생활코딩</strong> 유튜브 채널로 코딩에
            입문했고 인터넷으로 접근할 수 있는 웹어플리캐이션을 만드는 걸 목표로 삼았습니다.
            <strong>100일 글쓰기 챌린지라는 서비스를 배포</strong>했습니다. 각종 블로그를 참고하여
            기능을 만들고 스택오버플로우 그리고 공식문서를 참고하여 에러를 해결했습니다. JavaScript는 <strong>모던 자바스크립트 Deep Dive</strong>라는 책으로 공부했습니다. 
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
      background: url(static/profile01.png);
      background-repeat: no-repeat;
      background-size: cover;
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
