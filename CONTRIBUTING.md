## Css 클래스 규칙

BEM 규칙을 따르도록합니다.

Box _ Element - Modify
예시) header_inner-animation

## CSS 선택자 규칙

1. Layout ( display, Position... )
2. Box ( Margin, Padding, Border-box... )
3. Background ( Background... )
4. Font (Font-family, Font-Size... )
5. Animation (keyframe, transition, transform... ) 
6. ETC

파일명은 케밥케이스로 합니다.
변수, 함수는 캐멀케이스로 작성합니다.
들여쓰기는 4칸 띄어서 적습니다.


### ✏️ 타입(type) 목록

| 타입 | 설명 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 (README, 주석 등) |
| `style` | 코드 포맷, 세미콜론 누락 등 변경 (기능 변경 없음) |
| `refactor` | 코드 리팩토링 (기능 변경 없음) |
| `test` | 테스트 코드 추가 또는 수정 |
| `chore` | 빌드 업무, 패키지 매니저 설정 등 기타 작업 |
| `perf` | 성능 개선 관련 코드 |
| `ci` | CI 설정 관련 |
| `build` | 빌드 시스템 혹은 외부 의존성에 영향을 미치는 변경 |
| `revert` | 이전 커밋 되돌리기 |

### 🧾 커밋 메시지 예시

```bash
git commit -m "feat: 유저 프로필 조회 기능 추가"
git commit -m "fix: 로그인 실패 시 에러 메시지 출력"
git commit -m "style: 코드 정렬 및 불필요한 공백 제거"
git commit -m "docs: 프로젝트 소개 README에 추가"
=======
+ 파일명은 케밥케이스로 합니다.
+ 변수, 함수는 캐멀케이스로 작성합니다.
+ 클래스명은 파스칼케이스로 작성합니다.
+ 들여쓰기는 4칸 띄어서 적습니다.

## Css 클래스 규칙

BEM 규칙을 따르도록합니다.

Box _ Element - Modify
예시) header_inner-animation

## CSS 선택자 규칙

1. Layout ( display, Position... )
2. Box ( Margin, Padding, Border-box... )
3. Background ( Background... )
4. Font (Font-family, Font-Size... )
5. Animation (keyframe, transition, transform... ) 
6. ETC

+ 파일명은 케밥케이스로 합니다.
+ 변수, 함수는 캐멀케이스로 작성합니다.
+ 들여쓰기는 4칸 띄어서 적습니다.


### ✏️ 타입(type) 목록

| 타입 | 설명 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 (README, 주석 등) |
| `style` | 코드 포맷, 세미콜론 누락 등 변경 (기능 변경 없음) |
| `refactor` | 코드 리팩토링 (기능 변경 없음) |
| `test` | 테스트 코드 추가 또는 수정 |
| `chore` | 빌드 업무, 패키지 매니저 설정 등 기타 작업 |
| `perf` | 성능 개선 관련 코드 |
| `ci` | CI 설정 관련 |
| `build` | 빌드 시스템 혹은 외부 의존성에 영향을 미치는 변경 |
| `revert` | 이전 커밋 되돌리기 |

### 🧾 커밋 메시지 예시

```bash
git commit -m "feat: 유저 프로필 조회 기능 추가"
git commit -m "fix: 로그인 실패 시 에러 메시지 출력"
git commit -m "style: 코드 정렬 및 불필요한 공백 제거"
git commit -m "docs: 프로젝트 소개 README에 추가"
