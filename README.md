# LLM_API_NodeJS

Claude(Anthropic)와 OpenAI GPT API를 Node.js에서 호출하는 실습 프로젝트입니다.  
단순 질의응답부터 **IT 기업 기술 스택 분석 AI 에이전트**까지 LLM 연동 패턴을 학습합니다.

## 주요 기능

- **Claude API 호출** (`askClaude`): Anthropic SDK로 메시지 전송
- **OpenAI API 호출** (`askGPT`): GPT-4o-mini로 기술 스택 분석 어시스턴트 응답
- **대화 히스토리** (`chatWithHistory`): 멀티턴 대화 유지
- **기술 스택 에이전트** (`techStackAgent`): 2단계 파이프라인
  1. 기업명 → 기술 스택 JSON 추출
  2. 추출 결과 → 강점·약점·개선 제안·종합 평가 보고서 작성

## 기술 스택

| 구분 | 기술 |
|------|------|
| Runtime | Node.js |
| LLM | Anthropic Claude (`claude-sonnet-4-20250514`), OpenAI (`gpt-4o-mini`) |
| 패키지 | `@anthropic-ai/sdk`, `openai`, `dotenv` |

## 프로젝트 구조

```
LLM_API_NodeJS/
├── index.js        # LLM 호출 및 techStackAgent 메인 로직
├── package.json
└── .env            # API 키 (Git에 포함하지 않음)
```

## 실행 방법

### 1. 환경 변수

프로젝트 루트에 `.env` 파일을 생성합니다.

```env
ANTHROPIC_API_KEY=your_anthropic_api_key
OPENAI_API_KEY=your_openai_api_key
```

### 2. 설치 및 실행

```bash
npm install
node index.js
```

실행 시 Claude에게 Node.js vs Python AI 개발 적합성 질문 후, `Narrative` 기업 기술 스택 분석 에이전트가 동작합니다.

## 에이전트 동작 흐름

```
기업명 입력
    ↓
[Step 1] Claude → 기술 스택 JSON (frontend, backend, DB, infra, AI/ML)
    ↓
[Step 2] Claude → 분석 보고서 (강점, 약점, 개선 제안, 종합 평가)
    ↓
결과 출력
```

## 참고

- API 키는 [Anthropic Console](https://console.anthropic.com/), [OpenAI Platform](https://platform.openai.com/)에서 발급합니다.
- `node_modules`는 `.gitignore`에 추가하는 것을 권장합니다.

## 라이선스

MIT
