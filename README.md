# STAY BUT 友

성수 스테이벗 웹사이트

## GitHub Pages 올리는 법

1. GitHub에서 새 저장소를 만듭니다 (이름: staybut)
2. 이 폴더의 파일을 전부 올립니다
   - index.html
   - style.css
   - app.js
   - images 폴더
3. 저장소 Settings → Pages
4. Source를 main 브랜치 / (root) 로 지정
5. 몇 분 뒤 https://아이디.github.io/staybut 에서 열립니다

## 도메인 연결 (staybut.kr)

1. 저장소 Settings → Pages → Custom domain 에 staybut.kr 입력
2. 가비아 DNS 설정에서 A 레코드 4개 추가
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
3. CNAME 으로 www → 아이디.github.io 추가
4. 반영까지 10분 ~ 1시간
