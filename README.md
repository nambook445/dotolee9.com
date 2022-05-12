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
* 개선할 사항 및 추가할 기능
# 3. 사용법
[서비스 주소](http://dotolee9.com)
로그인하지 않아도 글 작성과 열람이 가능하지만, 수정 또는 삭제할 수 없습니다.
# 4. 기술스택과 사용한 라이브러리
**UI & 디자인**: MUI, Minimal React(대쉬보드 무료템플릿), Styled-Components, SweetAlert2

**클라이언트**: React, React hook, Redux, Redux Persist(session storage), Axios, Create proxy middleware, React Quill, Yup, Formik, Helmet

**서버**: NodeExpress, Passport JS(local strategy), Bycript, MySQL, MySQL SessionStore, Multer, CORS

**배포**: AWS EC2, Route 53, Ubuntu, Nginx

**개발툴**: NPM, PM2, Git, ESlint, Prettier
# 5. 기능
### CRUD
---

Title은 필수입력입니다.

![캡처](https://user-images.githubusercontent.com/94095336/168008299-f089fd99-7761-407b-b519-e30b0bf5907f.png)

---

글 작성에 성공하면 blog페이지로 이동합니다.

![캡처](https://user-images.githubusercontent.com/94095336/168008296-76dece0c-52c2-4031-b377-bd4c2b6f8740.png)

---

카드 UI의 제목을 클릭하면 topic 페이지로 이동합니다.

![캡처](https://user-images.githubusercontent.com/94095336/168008291-936bea72-ecd5-4ab8-89d0-ee8abebd4993.png)

---

topic.user_id와 users.id의 일치여부에 따라서 조건부 렌더링하는 방식으로 수정, 삭제 권한설정을 했습니다.

![캡처](https://user-images.githubusercontent.com/94095336/168008287-bd4f649e-8f09-45e4-b676-3a6ff45f9460.png)

---


  
### 회원가입과 회원정보 수정
### 로그인

# 6. 인용
> 인용1

> 인용2
>> 인용안의 인용

# 7. 수평선 넣기

---
  
# 8. 링크 달기
(1) 인라인 링크  

[블로그 주소](https://lsh424.tistory.com/)

(2) 참조 링크  

[블로그 주소][blog]

[blog]: https://lsh424.tistory.com/

# 9. 이미지 추가하기
![이탈리아 포지타노](https://user-images.githubusercontent.com/31477658/85016059-f962aa80-b1a3-11ea-8c91-dacba2666b78.jpeg)

### 이미지 사이즈 조절
<img src="https://user-images.githubusercontent.com/31477658/85016059-f962aa80-b1a3-11ea-8c91-dacba2666b78.jpeg"  width="700" height="370">

### 이미지 파일로 추가하기
<img src="Capri_Island.jpeg" width="700">

# 10. 코드블럭 추가하기

```swift
public struct CGSize {
  public var width: CGFloat
  public var heigth: CGFloat
  ...
}
```

# etc

**텍스트 굵게**  
~~텍스트 취소선~~

### [개행]  

스페이스바를 통한 문장개행  
스페이스바를 통한 문장개행  

br태그를 사용한 문장개행
<br>
<br>
br태그를 사용한 문장개행


### [체크박스]

다음과 같이 체크박스를 표현 할 수 있습니다. 
* [x] 체크박스
* [ ] 빈 체크박스
* [ ] 빈 체크박스

### [이모지 넣기]
❤️💜💙🤍

### [표 넣기]
|왼쪽 정렬|가운데 정렬|오른쪽 정렬| 
|:---|:---:|---:| 
|내용1|내용2|내용3| 
|내용1|내용2|내용3| 

<br>

### 정리내용
[정리 내용 보기](https://lsh424.tistory.com/37)
