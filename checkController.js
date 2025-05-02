const { Pinecone } = require('@pinecone-database/pinecone');
require('dotenv').config();

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});

async function listIndexes() {
  const result = await pinecone.listIndexes();
  console.log("✅ Connected to Pinecone, your indexes:", result);
}

listIndexes().catch(console.error);
