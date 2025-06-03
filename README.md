

## 📁 프로젝트 구조

```
static-site/
├── index.html              # 메인 홈페이지 (Main.jsp → HTML)
├── css/                    # 원본 CSS 파일들 복사
│   ├── base.css
│   ├── Main.css
│   ├── userAcc.css
│   ├── userPayService.css
│   ├── userPay.css
│   ├── ServiceInfo.css
│   ├── Notice.css
│   ├── userInfo.css
│   ├── SupportFund.css
│   ├── nav.css
│   ├── header.css
│   └── ... (기타 CSS 파일들)
├── js/                     # 원본 JavaScript 파일들 복사
│   ├── common/
│   ├── user/
│   └── egovframework/
├── images/                 # 원본 이미지 파일들 복사
│   └── common/
│       ├── logo_w.png
│       ├── contents_1_img.png
│       ├── payment_*.svg
│       └── ... (기타 이미지 파일들)
└── pages/                  # 서브 페이지들
    ├── userAcc.html        # 선정산 페이지
    ├── userPayService.html # 월세/거래처 결제 페이지
    ├── userPay.html        # 배달비 충전 페이지
    ├── ServiceInfo.html    # 서비스 안내 페이지
    ├── Notice.html         # 공지사항 페이지
    ├── userInfo.html       # 사용자 정보 페이지
    └── SupportFund.html    # 운영지원금 페이지
```

### ✅ 완료된 페이지
- **index.html** - 메인 홈페이지 (Main.jsp 기반)
  - 배너 슬라이더 (Swiper.js)
  - 서비스 메뉴 (선정산, 운영자금 지원, 월세결제, 배달비충전)
  - 공지사항 팝업
  - 하단 네비게이션

- **pages/userAcc.html** - 선정산 페이지
  - 일별/월간 탭 기능
  - 매출 정보 상세 보기
  - 차트 시각화 (Chart.js)
  - 날짜/월 선택 기능

- **pages/userPayService.html** - 월세/거래처 결제 페이지
  - 입금받는분 선택 (Swiper 슬라이더)
  - 카드 선택 기능
  - 결제 금액 입력 및 계산
  - 결제 처리 기능

- **pages/userPay.html** - 배달비 충전 페이지
  - 송금액/결제액 기준 탭 전환
  - 한글 금액 변환 기능
  - 카드 선택 및 할부 옵션
  - 결제 처리 기능

- **pages/ServiceInfo.html** - 서비스 안내 페이지
  - Swiper 슬라이더로 서비스 소개
  - 상점페이 서비스 전체 안내
  - 선정산/배달비충전/월세결제 정보
  - 단계별 이용 절차 안내

- **pages/Notice.html** - 공지사항 페이지
  - 공지사항 토글 기능
  - 실제 공지사항 샘플 데이터
  - 날짜별 정렬 표시
  - 확장/축소 애니메이션

- **pages/userInfo.html** - 사용자 정보 페이지
  - 로그인 정보 표시
  - 사업장 정보 관리
  - 비밀번호 변경 모달
  - 서비스 문의 기능

- **pages/SupportFund.html** - 운영지원금 페이지
  - 운영지원금 신청 절차
  - 혜택 및 조건 안내
  - 상담 신청 기능
  - 전화/카톡 상담 연결

## 🎨 주요 기능

### 1. 반응형 모바일 디자인
- 모바일 우선 설계
- 터치 인터페이스 최적화
- 네비게이션 바 고정

### 2. 인터랙티브 요소
- Swiper.js 기반 슬라이더
- Chart.js 데이터 시각화
- 탭 전환 기능
- 날짜 선택기
- 모달 다이얼로그

### 3. 사용자 경험
- 부드러운 애니메이션
- 즉시 피드백
- 직관적인 UI
- 한글 금액 변환
- 실시간 계산

## 🔧 사용된 기술

- **HTML5**: 시멘틱 마크업
- **CSS3**: 플렉스박스, 그리드, 애니메이션
- **JavaScript (ES6+)**: Vanilla JS
- **Swiper.js**: 슬라이더 컴포넌트
- **Chart.js**: 데이터 시각화
- **Flatpickr**: 날짜 선택기
- **Bootstrap Icons**: 아이콘

