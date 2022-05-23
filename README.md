# Udon Meet

동네 친구를 만들어 보자!

## Contributor

- @Ko-GyeongTae

## Tech Requirement (Tech Stack)

- Typescript
- ESLint
- Typeorm
- Express.js
- MySQL

## Struct

    src
    | app.js # App entry point
    └───controllers # Express route controller for all the endpoints of the app
    └───configs # Environment variables and configuration related stuff
    └───loaders # Split the startup process into modules
    └───models # Define all models
    └───services # All the business logic is here
    └───types # Type declaration files (d ts) for Typescript

## Commit Rules

### Header

    타입(Type)

    * Feat      - 새로운 기능
    * Fix       - 버그
    * Build     - 빌드 관련 파일
    * Ci        - CI 관련 설정
    * Docs      - 문서 관련
    * Style     - 스타일
    * Refactor  - 리팩토링
    * Test      - 테스트
    * Chore     - 기타 변경사항

### Body

    본문(Body)

    * 한줄이 72자 이내
    * 사유만 간결하게
    * 선택사항

### Footer

    푸터(Footer)

    * 해결 : issueCode
    * 관련 : issueCode
    * 참조 : issueCode
