const { OpenAI } = require("openai");
const { Pinecone } = require("@pinecone-database/pinecone");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

async function queryProducts(question, topK = 5) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: question,
  });

  const queryEmbedding = response.data[0].embedding;

  const results = await index.query({
    vector: queryEmbedding,
    topK,
    includeMetadata: true,
    filter: {
      illness: "IBS" // <- 👈 only match this illness
    }
  });

  return results.matches.map((match) => ({
    id: match.id,
    score: match.score,
    name: match.metadata.name,
    illness: match.metadata.illness,
    text: match.metadata.text,
  }));
}

// Example usage:
(async () => {
  const question = "What helps with chronic inflammation and fatigue from IBS?";
  const topResults = await queryProducts(question, 5);
  console.log("🔍 Top Matches:", topResults);
})();