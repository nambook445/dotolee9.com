# 100일 글쓰기 챌린지

# 1. 소개
  글쓰기 습관을 기르기 위한 웹어플리캐이션입니다.  
# 2. 목차
* 사용법
* 기술스택과 사용한 라이브러리
* 기능
  1.CRUD
  2.회원가입과 회원정보 수정
  3.로그인
* 참고
* 개선할 사항 및 추가할 기능
# 3. 사용법
[서비스 주소](http://dotolee9.com)
로그인하지 않아도 글 작성과 열람이 가능하지만, 수정 또는 삭제할 수 없습니다.
# 4. 기술스택과 사용한 라이브러리
UI,디자인: MUI, Minimal React(대쉬보드 무료템플릿), Styled-Components, SweetAlert2
클라이언트: React, React hook, Redux, Redux Persist(session storage), Axios, Create proxy middleware, React Quill, Yup, Formik
서버: NodeExpress, Passport JS(local strategy), bycript, MySQL, MySQL SessionStore, Multer, CORS
배포: AWS EC2, Route 53, Ubuntu, Nginx
개발툴: NPM, PM2, Git, ESlint, Prettier
# 5. 굵은 글씨 작성
**텍스트**

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
