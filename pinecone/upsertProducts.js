const fs = require("fs");
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

const products = JSON.parse(fs.readFileSync("./data/products.json", "utf8"));

async function embedText(text) {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });
    return response.data[0].embedding;
  }
  

async function upsertProducts() {
  const vectors = [];

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const text = `${product.name} - ${product.description}`;
    const embedding = await embedText(text);

    vectors.push({
      id: `product-${i + 1}`,
      values: embedding,
      metadata: {
        name: product.name,
        illness: product.illness,
        text
      }
    });
  }

  try {
    await index.upsert(vectors);
    console.log("✅ Products successfully embedded and upserted to Pinecone.");
  } catch (err) {
    console.error("❌ Upsert failed:", err);
  }
}

upsertProducts();
