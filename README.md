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
