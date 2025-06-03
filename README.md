# Store Payment Management - 정적 HTML 버전

이 프로젝트는 원래 Spring 기반의 웹 애플리케이션 JSP 파일들을 정적 HTML로 변환한 버전입니다.

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

## 🚀 실행 방법

### 1. 브라우저에서 직접 실행
`index.html` 파일을 브라우저에서 열어보세요.

### 2. 로컬 HTTP 서버 실행
```bash
# Python 사용
python -m http.server 8000

# Node.js http-server 사용
npx http-server -p 8000

# PHP 사용
php -S localhost:8000
```

실행 후 `http://localhost:8000`으로 접속하세요.

## 📋 변환된 페이지

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

## 📱 브라우저 지원

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)
- 모바일 브라우저 (iOS Safari, Chrome Mobile)

## 🔄 원본 JSP 파일 연결

| HTML 파일 | 원본 JSP 파일 | 설명 |
|-----------|---------------|------|
| index.html | Main.jsp | 메인 홈페이지 |
| userAcc.html | userAcc.jsp | 선정산 페이지 |
| userPayService.html | userPayService.jsp | 월세/거래처 결제 |
| userPay.html | userPay.jsp | 배달비 충전 |
| ServiceInfo.html | ServiceInfo.jsp | 서비스 안내 |
| Notice.html | Notice.jsp | 공지사항 |
| userInfo.html | userInfo.jsp | 사용자 정보 |
| SupportFund.html | SupportFund.jsp | 운영지원금 |

## 📄 미변환 JSP 파일

다음 JSP 파일들은 보조 기능이므로 HTML 변환에서 제외되었습니다:
- userCard.jsp (카드 관리)
- userIDhelp.jsp (ID 찾기)
- userPWDhelp.jsp (비밀번호 찾기)
- userPayDetail.jsp (결제 상세)
- appInfo.jsp (앱 정보)
- error.jsp (에러 페이지)

필요 시 동일한 방식으로 추가 변환 가능합니다.

## ⚠️ 알려진 제한사항

- 실제 서버 연동 없음 (데이터는 하드코딩)
- 결제 기능은 UI만 구현 (실제 결제 API 없음)
- 사용자 인증 기능 없음
- 실시간 데이터 업데이트 없음
- 카카오톡/전화 연결은 시뮬레이션

## 🔍 개발 정보

- 원본 프레임워크: Spring MVC + egovframework 3.8.0
- 변환 날짜: 2024-12-03
- 변환 범위: 주요 사용자 페이지들 (8개 페이지)
- CSS/JS 파일: 원본 그대로 사용
- 네비게이션: 모든 페이지 간 연결 완료

---

**Note**: 이 버전은 원본 JSP 애플리케이션의 정적 HTML 변환 버전입니다. 실제 운영을 위해서는 백엔드 API와 데이터베이스 연동이 필요합니다. 