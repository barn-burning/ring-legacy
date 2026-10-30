# 레전드 기록 비교 · Alpha 0.9.15

자료 기준은 사용자가 지정한 [The Ring — RING OF FAME](https://www.ringmagazine.com/fighters/legends)입니다. 아래 12명의 공개 프로필에서 Professional 탭의 승·패·무·KO, 별명과 Career 항목을 직접 확인했습니다. 확인일은 2026-10-30입니다. 프로필은 클라이언트에서 내용을 불러오므로 브라우저 화면에서 확인했습니다.

선수 소개 문구는 원문 설명을 복사하지 않고 확인한 기록과 별명을 바탕으로 작성했습니다. 사진은 복제하지 않습니다. 원문 링크를 게임 안에 표시합니다. 이 명단은 해당 페이지 전체 명단이나 전 시대의 공식 순위를 의미하지 않습니다.

| 선수 | 승–패–무 | KO | 원문 Career | 출처 |
|---|---:|---:|---|---|
| 무하마드 알리 | 56–5–0 | 37 | 1960–1981 | [The Ring](https://www.ringmagazine.com/fighters/muhammad-ali-29hey9kPEMMfdAAogyyPj9) |
| 플로이드 메이웨더 | 50–0–0 | 27 | 1996–2017 | [The Ring](https://www.ringmagazine.com/fighters/floyd-mayweather-1cRhgtrnLYV8OIZf3zEl8I) |
| 마이크 타이슨 | 50–7–0 | 44 | 1985–2005 | [The Ring](https://www.ringmagazine.com/fighters/mike-tyson-1joMEypPeAzEHyB7IWq9al) |
| 조지 포먼 | 76–5–0 | 68 | 1969–1997 | [The Ring](https://www.ringmagazine.com/fighters/george-foreman-5nyJYuutjGAv4srXznUY0) |
| 슈거 레이 레너드 | 36–3–1 | 25 | 1977–1997 | [The Ring](https://www.ringmagazine.com/fighters/ray-leonard-56vtiT1ajnCZt7F9FFi7vb) |
| 슈거 레이 로빈슨 | 174–19–5 | 109 | 1940–1965 | [The Ring](https://www.ringmagazine.com/fighters/ray-robinson-SHclgSSDd26AZQQRtfpz2) |
| 로베르토 두란 | 103–16–0 | 70 | 1968–2001 | [The Ring](https://www.ringmagazine.com/fighters/roberto-duran-5O0H6eLHVoaCArbGSxc2J7) |
| 마빈 해글러 | 62–3–2 | 52 | 1973–1988 | [The Ring](https://www.ringmagazine.com/fighters/marvin-hagler-4vLsnyzPbNlkIoJPz79iqY) |
| 조 루이스 | 66–3–0 | 52 | 1934–1951 | [The Ring](https://www.ringmagazine.com/fighters/joe-louis-7CcWnLoU8SHMN8DLpENgKU) |
| 레녹스 루이스 | 41–2–1 | 32 | 1989–2004 | [The Ring](https://www.ringmagazine.com/fighters/lennox-lewis-6YO0iBT0bR9ZPg91ZUb3DT) |
| 로키 마르시아노 | 49–0–0 | 43 | 1947–1955 | [The Ring](https://www.ringmagazine.com/fighters/rocky-marciano-3rfPzXzjnPeXnR2yzXmHPQ) |
| 조 프레이저 | 32–4–1 | 27 | 1965–1981 | [The Ring](https://www.ringmagazine.com/fighters/joe-frazier-2YONxUcr0YB0uTaaGtdeEQ) |

## 계산과 표시

- 총경기수는 이 프로필들에서 확인한 승+패+무 합계입니다. KO승률은 KO·TKO승 ÷ 해당 총경기수, 승률은 승 ÷ 해당 총경기수입니다. 예를 들어 알리의 KO승률은 37÷61=60.7%입니다. 승리한 경기만을 분모로 삼지 않습니다.
- 데이터가 없는 항목과 아직 경기가 없는 커리어의 비율은 `—`로 표시합니다.
- 원문의 Career 값은 ‘원문 활동 기간’으로 표시합니다. 실제 마지막 공식 경기 연도를 별도로 확정한 값으로 취급하지 않습니다. 예를 들어 타이슨은 원문 전적에 7패가 표시되는 한편 Career 항목은 1985–2005로 표시되어 있어 두 정보를 임의로 수정해 합치지 않았습니다.
- 레전드의 GOAT 점수는 임의로 만들지 않습니다. 비교 화면은 시뮬레이션 승률·난수·자금·GOAT 점수에 영향을 주지 않습니다.
- 커리어 기록 화면, 은퇴 결과, 저장된 명예의 전당에서 현재 또는 지난 커리어를 선택해 비교합니다. 사진이나 외부 스크립트 없이 포함된 정적 자료만 사용하므로 플레이 중 The Ring 접속이 필요하지 않습니다.

## 검증

`tests/legends.cjs`: 12명 및 출처, 주요 기록 차이, KO 비율 분모, 무전적·미확인 수치 처리, 현재/과거 커리어 선택, 이름 출력 안전성, 게임 상태·GOAT·난수 불변을 확인합니다.
