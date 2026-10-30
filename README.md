# RING LEGACY

무명의 복서가 세계 챔피언이 되기까지의 여정을 담은 복싱 육성 게임입니다.

[바로 플레이](https://barn-burning.github.io/ring-legacy/)

현재 버전: **Alpha 0.9.7**

## 플레이 및 개발

설치나 서버 없이 동작하는 정적 웹 게임입니다. 로컬에서는 `python -m http.server 8000`을 실행하고 http://localhost:8000 에 접속하세요.

`index.html`에 게임 화면과 로직이, `assets/`에 이미지가 있습니다. 수정 후 `npm test`로 경기 진행, GOAT 점수, 튜토리얼 경제 로직을 확인합니다. 테스트는 Node.js 22에서 실행하며 추가 패키지는 필요하지 않습니다. 화면 확인은 별도로 진행합니다.

## 배포

GitHub 저장소의 Settings → Pages → Source에서 **GitHub Actions**를 선택합니다. 이후 main 브랜치에 변경을 push하면 테스트를 거쳐 자동 배포됩니다. 공개 주소는 Actions 배포 결과에서 확인할 수 있습니다.

## 저장

진행 상황은 브라우저의 localStorage에 저장됩니다. PC와 모바일, 서로 다른 브라우저, 로컬 파일과 웹 주소 사이에서는 자동 동기화되지 않습니다. 브라우저 데이터를 삭제하면 진행 상황이 사라질 수 있습니다.

## 피드백

Issues에 사용 기기, 브라우저, 재현 과정과 함께 제보해주세요. 오류 화면을 첨부하면 원인을 찾는 데 도움이 됩니다.

폰트는 Google Fonts의 Noto Sans KR(400–800)을 사용합니다.
