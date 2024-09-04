# Newsfeed 프로젝트

**Newsfeed**는 사용자가 짧은 설명과 함께 간단한 게시물(짤방)을 작성, 조회, 수정, 삭제할 수 있는 웹 애플리케이션입니다. 많은 소셜 미디어가 복잡한 기능을 제공하는 반면, Newsfeed는 사용자에게 간단하게 일상을 기록할 수 있는 플랫폼을 제공합니다. 이 앱은 사용자의 시간과 노력을 최소화하면서 일상을 쉽게 공유할 수 있도록 설계되었습니다.

이 프로젝트는 Supabase를 백엔드로 사용하여 실시간 데이터베이스와 인증 기능을 구현하고, Context API와 React Router DOM을 활용하여 상태 관리와 라우팅을 처리합니다.
</br>
</br>
## 📌 주요 기능

- **게시물 CRUD**: 게시물 작성, 조회, 수정, 삭제 기능 제공
- **사용자 인증**: 회원 가입 및 로그인 기능
- **프로필 관리**: 사용자 프로필 보기 및 수정 기능
- **페이지 내비게이션**: React Router DOM을 통한 페이지 간 이동
- **배포**: Vercel을 통한 간편한 배포

</br>
</br>

## 🚀 기술 스택

- **프론트엔드**
    - React 18
    - styled-components
    - React Router DOM
- **백엔드**
    - Supabase (@supabase/supabase-js)
        - **Authentication API**: 사용자 인증 및 관리
        - **Database API**: CRUD 데이터베이스 핸들링
        - **Storage API**: 사용자 프로필 이미지 업로드 및 다운로드 URL 관리
- **개발 도구**
    - Vite
    - ESLint
    - Prettier
- **📜 코드 품질 관리**
    - ESLint: 코드 스타일과 품질 검사
    - Prettier: 코드 포맷팅  
- **🌐 배포**
    - Vercel을 이용하여 애플리케이션을 배포합니다. 배포는 main 브랜치에서 진행됩니다.

</br>
</br>


## 🔧 트러블 슈팅

1. **인증 정책 및 정보 추가 문제**
    - **문제**: 인증 정책이 필요하고, 프로필 정보 추가 시 문제가 발생.
    - **해결**: 인증된 사용자만 접근하도록 인증 정책을 정의하고, 데이터 전송 및 스키마를 점검하여 문제 해결.
2. **댓글 작성자 정보 누락**
    - **문제**: 댓글 작성자의 username 정보가 누락됨.
    - **해결**: JOIN 쿼리 및 데이터 전달 방식을 점검하고, 서버에서 username을 올바르게 처리하도록 수정.
3. **이미지 업로드 문제**
    - **문제**: 이미지 업로드 후 수정 시 새로운 이미지가 반영되지 않음.
    - **해결**: 이미지 URL 상태를 업데이트하고, Supabase 저장소에서 올바른 공개 URL을 가져오도록 검토.
4. **메인 페이지 사용자 정보 누락**
    - **문제**: 포스트 정보에 사용자 프로필이 포함되지 않음.
    - **해결**: posts와 profiles 테이블을 조인하여 사용자 정보를 포함하도록 쿼리 수정 및 상태 관리 개선.

</br>
</br>


## 📁폴더 구조

```
newsFeed
├─ public
│  └─ icons
│     └─ vite.svg
├─ src
│  ├─ api
│  │  └─ supabase.js
│  ├─ assets
│  │  ├─ db
│  │  ├─ fonts
│  │  └─ images
│  ├─ components
│  │  ├─ common
│  │  │  ├─ Button.jsx
│  │  │  ├─ Menu.jsx
│  │  │  └─ Modal.jsx
│  │  ├─ layout
│  │  │  ├─ Footer.jsx
│  │  │  ├─ Header.jsx
│  │  │  └─ Layout.jsx
│  │  ├─ mypage
│  │  │  └─ Mypage.jsx
│  │  └─ sample
│  │     └─ Sample.jsx
│  ├─ hooks
│  │  └─ useThrottle.js
│  ├─ redux
│  │  ├─ config
│  │  │  └─ configStore.js
│  │  └─ slices
│  │     └─ functionSlice.js
│  ├─ shared
│  │  └─ Router.jsx
│  ├─ styles
│  │  ├─ animation.js
│  │  ├─ common.js
│  │  ├─ index.css
│  │  ├─ layout.js
│  │  └─ reset.css
│  ├─ index.jsx
│  ├─ App.jsx
├─ eslint.config.js
├─ vite.config.js
├─ package.json
├─ .prettierrc
├─ .gitignore
├─ index.html
├─ README.md
├─ yarn.lock
└─ .env

```
