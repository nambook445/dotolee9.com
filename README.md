# 100일 글쓰기 챌린지

# 1. 소개
  글쓰기 습관을 기르기 위한 웹어플리캐이션입니다.  
# 2. 목차
* 사용법
* 기술스택과 사용한 라이브러리
* 기능
  * CRUD
  * 회원가입과 회원정보 수정
  * 로그인
* 참고
# 3. 사용법
[서비스 주소](http://dotolee9.com)
로그인하지 않아도 글 작성과 열람이 가능하지만, 수정 또는 삭제작업을 할 수 없습니다.
# 4. 기술스택과 사용한 라이브러리
**UI & 디자인**: MUI, Minimal React(대쉬보드 무료템플릿), Styled-Components, SweetAlert2

**클라이언트**: React, React hook, Redux, Redux Persist(session storage), Axios, Create proxy middleware, React Quill, Yup, Formik, Helmet

**서버**: NodeExpress, Passport JS(local strategy), Bycript, MySQL, MySQL SessionStore, Multer, CORS

**배포**: AWS EC2, Route 53, Ubuntu, Nginx

**개발툴**: NPM, PM2, Git, ESlint, Prettier
# 5. 기능
### CRUD
---

Title은 필수입력 조건입니다. [Source Code](https://github.com/nambook445/react_----/blob/master/server/client/src/pages/Paper.js)


![캡처](https://user-images.githubusercontent.com/94095336/168008299-f089fd99-7761-407b-b519-e30b0bf5907f.png)

---

글 작성에 성공하면 blog페이지로 이동합니다. [Source Code](https://github.com/nambook445/react_----/blob/master/server/client/src/pages/Blog.js)

![캡처](https://user-images.githubusercontent.com/94095336/168008296-76dece0c-52c2-4031-b377-bd4c2b6f8740.png)

---

카드 UI의 제목을 클릭하면 topic 페이지로 이동합니다. [Source Code](https://github.com/nambook445/react_----/blob/master/server/client/src/pages/Topic.js)

![캡처](https://user-images.githubusercontent.com/94095336/168008291-936bea72-ecd5-4ab8-89d0-ee8abebd4993.png)

---

topic.user_id와 users.id의 일치여부에 따라서 조건부 렌더링하는 방식으로 수정, 삭제 권한설정을 했습니다.
권한이 있다면 스위치로 활성/비활성 설정을 할 수 있습니다.

![캡처](https://user-images.githubusercontent.com/94095336/168008287-bd4f649e-8f09-45e4-b676-3a6ff45f9460.png)

---

EC2 인스턴스에 설치된 MySQL 서버, Topic을 관리하는 테이블입니다. 로컬에서 접근할 수 있습니다. [Source Code](https://github.com/nambook445/react_----/blob/master/server/Router/api.js)

![캡처](https://user-images.githubusercontent.com/94095336/168023762-7865c29b-c25f-40c2-b6e2-7d715be5d9d2.png)

---

### 회원가입과 회원정보 수정

Yup 라이브러리로 유효성 검사를 했습니다. [Source Code](https://github.com/nambook445/react_----/blob/master/server/client/src/sections/authentication/register/RegisterForm.js)

![캡처](https://user-images.githubusercontent.com/94095336/168008285-aa5fb745-239e-48ad-b283-67b96530e728.png)

---

User를 관리하는 테이블입니다. username은 유니크키로 설정했습니다. [Source Code](https://github.com/nambook445/react_----/blob/master/server/Router/user.js)

![캡처](https://user-images.githubusercontent.com/94095336/168023756-41ee74e6-b2ed-47ba-94b6-7124988976f4.png)

---

회원정보를 수정 할 수있습니다. Password와 Nickname을 변경할 수 있고, 프로필이미지를 등록할 수 있습니다. 암호화된 Password를 서버에서 bycrip가 인증하는 절차가 있습니다. [Source Code](https://github.com/nambook445/react_----/blob/master/server/Router/user.js)

![캡처](https://user-images.githubusercontent.com/94095336/168008286-2f68787b-9303-400d-8413-0d5afd42f3ef.png)

---
### 로그인

로그인 페이지입니다. 서버에서 유효성 검사를 하고 결과를 응답 받습니다. sweetalert2의 모달창으로 서버로부터 받은 메세지를 출력합니다.  [Source Code](https://github.com/nambook445/react_----/blob/master/server/client/src/pages/Login.js)

![캡처](https://user-images.githubusercontent.com/94095336/168008294-30f394a5-13ce-45e6-a4e8-2b270b2832d2.png)

---
Passport의 localstrategy 방식를 사용했고 세션쿠키 방식으로 인증합니다. [Source Code](https://github.com/nambook445/react_----/blob/master/server/main.js)

![캡처](https://user-images.githubusercontent.com/94095336/168008282-40cc9291-77bc-4b44-aba7-db36284f310b.png)

---

로그인 성공화면입니다.

![캡처](https://user-images.githubusercontent.com/94095336/168008276-5b9ff73b-ac92-4ce8-ac6f-167391aeb84d.png)

---

Passport에 의한 인증에 성공하면 serializeUser함수가 호출되고 식별자를 생성합니다.(primary key인 id로 설정했습니다.) passport는 MySQL SessionStore와 연동하여  MySQL SessionStore가 생성한 session 테이블에 식별자를 가지고 있는 세션아이디를 생성하고, 세션아이디를 쿠키에 담아서 응답합니다. 

![캡처](https://user-images.githubusercontent.com/94095336/168037324-8cb4e120-6f27-4c18-b178-c1a7898b1fde.png)
![캡처](
https://user-images.githubusercontent.com/94095336/168037341-fd452793-9b07-409d-ac81-6ce178615f92.png)

쿠키는 브라우저에 저장되고 서버에 요청할 때 요청헤더에 담겨서 서버에 전달됩니다.
passport는 쿠키에 담긴 세션아이디를 보고 세션아이디에 담긴 식별자로 user를 판단합니다.

![캡처](https://user-images.githubusercontent.com/94095336/168037339-49c6b0de-a96a-4015-997e-91be7e183748.png)

---

서버에서 로그인 상태라고 해도 HTTP는 상태유지가 되지 않기 때문에 클라이언트에서 로그인 상태를 별도로 유지합니다.
로그인 정보는 사용할 곳이 많아서, Redux를 사용했습니다. 클라이언트 로그인 상태유지는 Redux persist를 사용했고 session store에 상태 값을 저장하여 브라우저가 종료되면 삭제되도록 구현했습니다.
[Source Code](https://github.com/nambook445/react_----/tree/master/server/client/src/redux)

![캡처](https://user-images.githubusercontent.com/94095336/168037574-4514257d-9059-40bc-8894-735761763a61.png)

---

404페이지입니다. [Source Code](https://github.com/nambook445/react_----/blob/master/server/client/src/pages/Page404.js)

![캡처](https://user-images.githubusercontent.com/94095336/168044801-0846d971-3f96-47a4-9b56-1445f2f2b7cf.png)

---
# 6. 참고

## Minimal [(Free version)](https://minimal-kit-react.vercel.app/)

![license](https://img.shields.io/badge/license-MIT-blue.svg)

> Free React Admin Dashboard made with Material-UI components and React.

## License

Distributed under the MIT License. See [LICENSE](https://github.com/minimal-ui-kit/minimal.free/blob/main/LICENSE.md) for more information.

