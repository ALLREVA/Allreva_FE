# 콘서트 차량 대절 서비스 ALLREVA

<div align=center>
  <a href="https://allreva.store/">ALLREVA 서비스 바로가기</a><Br/><Br/>
  <img src="https://github.com/user-attachments/assets/b11ada27-c777-4cce-abc0-7b797caba8a1" width="300"><br/>
  <br/><strong>"🤔 공연에 가려면.. 이번엔 차대절을 어디서 구하지""</strong><Br/>
 <strong>ALLREVA</strong>는 <strong>All</strong>과 <strong>Reservation</strong> 합친 말로, 공연장 관련한 모든 차대절 예약 서비스를 더욱 편리하게 제공하고자 만든 서비스예요.
ALLREVA는 이러한 번거로운 과정을 한 곳에서 손쉽게 공연장을 선택하고, 차량 대절을 개설 혹은 참여할 수 있도록 도와드려요.
</div>

<br/>

# ✨ 멤버 소개

<div align=center>

| <img src="https://avatars.githubusercontent.com/u/76546167?v=4" width="80"> | <img src="https://avatars.githubusercontent.com/u/54847910?v=4" width="80"> | <img src="https://avatars.githubusercontent.com/u/110520124?v=4" width="80"> |
| :-------------------------------------------------------------------------: | :-------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|                     [김도연](https://github.com/nxnaxx)                     |                    [노기훈](https://github.com/CH4MD0M)                     |                   [정혜인](https://github.com/zelkovaria)                    |
|                                  FrontEnd                                   |                               FrontEnd(팀장)                                |                                   FrontEnd                                   |

</div>
<br/>

# 🛠 기술 스택

<div align=center>

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![StyledComponents](https://img.shields.io/badge/emotion-DB7093?style=for-the-badge&logo=emotion&logoColor=white)
![Zustand](https://img.shields.io/badge/react%20zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![ReactQuery](https://img.shields.io/badge/Reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![ReactRouter](https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

</div>

<br/>

# 💻 Convention

## 🤝 Branch Naming Convention

| 머릿말  | 설명                               |
| ------- | ---------------------------------- |
| main    | 서비스 브랜치                      |
| develop | 배포 전 작업 기준                  |
| feature | 기능 단위 구현                     |
| hotfix  | 서비스 중 긴급 수정 건에 대한 처리 |

`예시: ARV-이슈번호-feat/작업내용`

## 🤝 Commit Convention

| 머릿말   | 설명                                                |
| -------- | --------------------------------------------------- |
| feat     | 새로운 기능 추가                                    |
| fix      | 버그 수정                                           |
| design   | CSS 디자인 등 사용자 UI                             |
| style    | 코드 포맷 변경                                      |
| refactor | 프로덕션 코드 리팩토링업                            |
| docs     | 문서 수정                                           |
| chore    | 빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우 |
| rename   | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우  |
| remove   | 파일을 삭제하는 작업만 수행한 경우                  |
| deploy   | 배포 관련 변경 사항의 경우                          |

## 🤝 Naming Convention

### 기본 네이밍 컨벤션

1. 컴포넌트는 `PascalCase` 사용
2. 폴더명은 `camelCase` 사용
3. 파일 명(**컴포넌트 제외**)은 camelCase 사용
4. 변수 및 함수는 `camelCase` 사용
5. 파라미터는 `camelCase` 사용
6. 상수는 `BIG_SNAKE_CASE` 사용
   <br/>

### 타입(Type) 컨벤션

1. prop 타입 interface 선언 시 → `컴포넌트명+Props`

```tsx
// 예시
interface PostPageProps {
		title: string | undefined;
		setContentWithoutTag: (content: string) => void;
}

const PostPage = (props: PostPageProps) => {
		const {title,
		setContentWithoutTag
		...
}
```

### 스타일(style) 컨벤션

- 컴포넌트 네이밍 규칙 : `Container` → `Wrapper` → `Box`

<br/>
