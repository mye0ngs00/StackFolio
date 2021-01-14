# Velog Clone Frontend

## /src
## /components
Directory for components

### /atoms
  - Recoil 상태관리를 위한 atom을 관리합니다.

### /home
  - Home화면에 들어갈 Components를 정의합니다. 
  - main page: Home.tsx

### /material
  - basic components ( buttons, textfield, ...etc )

### /sections
  - Header.tsx

### /styles
  - global-style.ts: 모든 페이지에 적용될 Global Style을 정의합니다.
  - media.ts: media query생성 함수를 구현합니다.
  - styled.d.ts: styled-components의 DefaultTheme를 재정의함으로써 라이트/다크모드를 사용할 수 있도록 합니다.
  - theme.ts: 라이트 / 다크 모드에 적용될 색상을 정의합니다.