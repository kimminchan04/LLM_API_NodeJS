require("dotenv").config();
const Anthropic = require("@anthropic-ai/sdk");
const claude = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});
async function askClaude(userMessage) {
    const response = await claude.message.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{role: "user", content: userMessage}] 
    });

    return response.content[0].text;
}
const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
async function askGPT(userMessage) {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {role: "system", content: "You are a helpful business's technology stack analyze assistant"},
            {role: "user", content: userMessage}
        ]
    });

    return response.choices[0].message.content;
}
async function chatWithHistory() {
    const history = [];
    async function chat(userMessage) {
        history.push({role: "user", content: userMessage});
        const response = await claude.messages.create({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1024,
            system: "당신은 IT 기업 기술 스택을 분석하는 전문가입니다 한국어로 답변하세요",
            messages: history
        });
        const assistantMessage = response.content[0].text;
        history.push({role: "assistant", content: assistantMessage});

        return assistantMessage;
    }

    return {chat, history};
}
async function techStackAgent(companyName) {
    console.log(`\n[agent start]: ${companyName} is analyzed`);
    const step1 = await askClaude(
        `${companyName}라는 IT 기업이 주로 사용하는 기술 스택을 추측해서 프론트엔드, 백엔드, 데이터베이스, 인프라, AI/ML 항목으로 나눠서 알려줘 JSON 형석으로 답해 줘 예: {"frontend": [], "backend": [], ...}`
    );
    console.log("[Step1]: Technology stack extraction is completed");
    let techStack;
    try {
        const jsonMatch = step1.match(/\{[\s\S]*\}/);
        techStack = JSON.parse(jsonMatch[0]);
    } catch {
        techStack = {raw: step1};
    }
    const step2 = await askClaude(
        `다음 기술 스택을 기반으로 ${companyName}의 기술 분석 보고서를 작성해 줘:
        ${JSON.stringify(techStack)}
        형식: 강점, 약점, 개선 제안, 종합 평가`
    );
    console.log("[Step2] Complete writing a report");

    return {
        company: companyName,
        techStack,
        report: step2
    };
}
async function main() {
    try {
        console.log("Ask to Claude");
        const answer = await askClaude("Node.js와 Python 중 AI 게발에 적합하 언어를 알려 줘");
        console.log(answer);
        console.log("\nAI agent is started");
        const result = await techStackAgent("Narrative");
        console.log("기술 스택: ", result.techStack);
        console.log("\n보고서:\n", result.report);
    } catch (err) {
        console.error("error: ", err.message);
    }
}
main();