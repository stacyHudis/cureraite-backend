const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function detectIllness(question) {
  const prompt = `
Classify the user's question into one of these illnesses:
- IBS
- PCOS
- Ulcerative Colitis
- Psoriasis

Question: "${question}"
Illness:
  `;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 10,
  });

  return completion.data.choices[0].text.trim();
}

module.exports = { detectIllness };